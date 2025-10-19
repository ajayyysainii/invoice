"use client"

import React from 'react'

interface Buyer {
  _id: string
  name: string
  email: string
  nameOfBusiness: string
  phone: number
  address: string
  gst: string
}

interface Invoice {
  _id: string
  userId: string
  buyerId: Buyer
  invoiceNumber: string
  dueDate: string
  totalAmount: number
  createdAt: string
  updatedAt: string
}

interface InvoiceListProps {
  invoices: Invoice[]
  loading?: boolean
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, loading = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-36"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
        <p className="text-gray-500">Create your first invoice to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div 
          key={invoice._id} 
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Invoice #{invoice.invoiceNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  Due {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(invoice.totalAmount)}
              </div>
              <div className="text-sm text-gray-500">
                Created {formatDate(invoice.createdAt)}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Client Details</h4>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    {invoice.buyerId.nameOfBusiness}
                  </p>
                  <p className="text-sm text-gray-600">
                    {invoice.buyerId.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {invoice.buyerId.email}
                  </p>
                  {invoice.buyerId.address && (
                    <p className="text-sm text-gray-500">
                      {invoice.buyerId.address}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end items-end">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    View
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InvoiceList
