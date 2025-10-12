"use client"
import InvoiceForm from "@/components/ui/invoiceForm"
import InvoicePreview from "@/components/ui/invoicePreview"
import { useState } from "react"
import InvoiceContextProvider from "@/context/InvoiceContextProvider"


const Create = () => {
  const [invoiceNumber, setInvoiceNumber] = useState();

  const handleInvoiceNumberChange = (value: string) => {
    setInvoiceNumber(value);
  };


  const data = [
    { id: 1, item: "John Doe", qty: 25, rate: 10, tax: 18 },
    { id: 2, item: "Jane Doe", qty: 26, rate: 10, tax: 18 },
    { id: 3, item: "John Smith", qty: 27, rate: 10, tax: 18 },
  ]

  return (
    <InvoiceContextProvider>
      <div className="flex justify-center h-screen">
        <div className="w-[50%] mx-2 my-2 rounded-md p-4 ring-1 ring-gray-200">
          <InvoiceForm onInvoiceNumberChange={handleInvoiceNumberChange} />
        </div>
        <div className="bg-[#fafafa] w-[50%] mx-2 my-2 rounded-md p-4 ring-1 ring-gray-200">
          <InvoicePreview invoiceNumber = {invoiceNumber} data = {data}/>
        </div>
      </div>
    </InvoiceContextProvider>

  )
}

export default Create