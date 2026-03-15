"use client"
import InvoiceForm from "@/components/ui/invoiceForm"
import InvoicePreview from "@/components/ui/invoicePreview"
import { useState } from "react"
import InvoiceContextProvider from "@/context/InvoiceContextProvider"
import { Eye, EyeOff } from "lucide-react"


const Create = () => {
  const [showPreview, setShowPreview] = useState(true)

  return (
    <InvoiceContextProvider>
      <div className="flex flex-col h-screen">
        {/* Toggle Button */}
        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 min-h-0">
          <div className={`bg-[#fafafa] mx-2 my-2 rounded-md p-4 ring-1 ring-gray-200 overflow-auto transition-all duration-300 ${showPreview ? 'w-[50%]' : 'w-full'}`}>
            <InvoiceForm />
          </div>
          {showPreview && (
            <div className="bg-[#fafafa] w-[50%] mx-2 my-2 rounded-md p-4 ring-1 ring-gray-200 transition-all duration-300">
              <InvoicePreview />
            </div>
          )}
        </div>
      </div>
    </InvoiceContextProvider>

  )
}

export default Create