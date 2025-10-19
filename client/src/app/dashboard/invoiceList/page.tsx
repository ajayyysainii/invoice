"use client"

import InvoiceList from "@/components/InvoiceList"
import axios from "axios"
import { useEffect, useState } from "react"

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

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const response = await axios.get("http://localhost:4000/invoice/list", headers);
        console.log(response.data);
        setInvoices(response.data);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
          <p className="text-gray-600">Manage and track your invoices</p>
        </div>
        
        <InvoiceList invoices={invoices} loading={loading} />
      </div>
    </div>
  )
}