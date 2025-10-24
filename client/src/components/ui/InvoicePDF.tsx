import React from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './pdf'

interface Buyer {
  _id: string
  name: string
  email: string
  nameOfBusiness: string
  phone: number
  address: string
  gst: string
}

interface InvoiceItem {
  item: string
  quantity: number
  price: number
  tax: number
  discount: number
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
  items: InvoiceItem[]
}

interface InvoicePDFProps {
  onClose: () => void
  invoice: Invoice
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ onClose, invoice }) => {
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Invoice PDF</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="h-[calc(90vh-80px)]">
          <PDFViewer width="100%" height="100%">
            <MyDocument invoice={invoice} />
          </PDFViewer>
        </div>
        
        {/* Download Button
        <div className="p-4 border-t border-gray-200">
          <PDFDownloadLink 
            document={<MyDocument invoice={invoice} />} 
            fileName={`invoice-${invoice.invoiceNumber}.pdf`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {({ loading }) => 
              loading ? 'Generating PDF...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </div> */}
      </div>
    </div>
  )
}

export default InvoicePDF