"use client"
import React, { useEffect, useState } from 'react'
import { getBuyers, updateBuyer, deleteBuyer, Buyer, BuyerPayload } from '@/api/buyers'
import { Trash2, SquarePen, X, Check, Plus, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BuyersList = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<BuyerPayload>>({})
  const router = useRouter()

  const fetchBuyers = async () => {
    try {
      const list = await getBuyers()
      setBuyers(list)
    } catch (error) {
      console.error('Failed to fetch buyers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuyers()
  }, [])

  const startEdit = (buyer: Buyer) => {
    setEditingId(buyer._id || buyer.id || '')
    setEditForm({
      name: buyer.name || '',
      email: buyer.email || '',
      nameOfBusiness: buyer.nameOfBusiness || '',
      phone: buyer.phone || 0,
      address: buyer.address || '',
      gst: buyer.gst || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async () => {
    if (!editingId) return
    try {
      await updateBuyer(editingId, editForm)
      setEditingId(null)
      setEditForm({})
      await fetchBuyers()
    } catch (error) {
      console.error('Failed to update buyer:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this buyer?')) return
    try {
      await deleteBuyer(id)
      await fetchBuyers()
    } catch (error) {
      console.error('Failed to delete buyer:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-36" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyers</h1>
          <p className="text-gray-600">Manage your buyer contacts</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/buyers/create')}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <Plus size={16} />
          Add Buyer
        </button>
      </div>

      {buyers.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No buyers yet</h3>
          <p className="text-gray-500 mb-4">Add your first buyer to get started.</p>
          <button
            onClick={() => router.push('/dashboard/buyers/create')}
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all"
          >
            Add Buyer
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {buyers.map((buyer) => {
            const id = buyer._id || buyer.id || ''
            const isEditing = editingId === id

            return (
              <div
                key={id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                {isEditing ? (
                  /* Edit Mode */
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Business Name</label>
                        <input
                          type="text"
                          value={editForm.nameOfBusiness || ''}
                          onChange={(e) => setEditForm({ ...editForm, nameOfBusiness: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                        <input
                          type="email"
                          value={editForm.email || ''}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                        <input
                          type="number"
                          value={editForm.phone || ''}
                          onChange={(e) => setEditForm({ ...editForm, phone: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                        <input
                          type="text"
                          value={editForm.address || ''}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">GST</label>
                        <input
                          type="text"
                          value={editForm.gst || ''}
                          onChange={(e) => setEditForm({ ...editForm, gst: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                      >
                        <Check size={14} />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-lg">
                            {(buyer.name || 'B').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{buyer.nameOfBusiness}</h3>
                          <p className="text-sm text-gray-500">{buyer.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 mt-4 pl-14">
                        <div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</span>
                          <p className="text-sm text-gray-700">{buyer.email || '—'}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</span>
                          <p className="text-sm text-gray-700">{buyer.phone || '—'}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GST</span>
                          <p className="text-sm text-gray-700 font-mono">{buyer.gst || '—'}</p>
                        </div>
                        <div className="md:col-span-3">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</span>
                          <p className="text-sm text-gray-700">{buyer.address || '—'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(buyer)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit buyer"
                      >
                        <SquarePen size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete buyer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BuyersList