"use client"
import InvoiceForm from "@/components/ui/invoiceForm"
import InvoicePreview from "@/components/ui/invoicePreview"
import { useState } from "react"
import InvoiceContextProvider from "@/context/InvoiceContextProvider"


const Create = () => {


  return (
    <InvoiceContextProvider>
      <div className="flex justify-center h-screen">
        <div className="w-[50%] mx-2 my-2 rounded-md p-4 ring-1 ring-gray-200">
          <InvoiceForm />
        </div>
        <div className="bg-[#fafafa] w-[50%] mx-2 my-2 rounded-md p-4 ring-1 ring-gray-200">
          <InvoicePreview/>
        </div>
      </div>
    </InvoiceContextProvider>

  )
}

export default Create