"use client"

import React, { useState } from 'react'

const InvoicePreview = ({invoiceNumber,data}) => {
  
  return (
    <>
    <h1 className="py-5 text-2xl font-semibold">Preview</h1>
          <div className="bg-white rounded-md p-4">
            <h2>Inovice</h2>
            <p>Invoice Number: {invoiceNumber}</p>
            <div className="max-w-4xl bg-white border border-gray-300 rounded-lg overflow-hidden mt-5">
              <div className="grid grid-cols-2">
                <div className="p-3 border-r border-gray-300">
                  <div className="text-gray-500 mb-3">Billed to</div>
                  <div className="font-semibold text-xl text-gray-900 mb-1">Acme Enterprise</div>
                  <div className="text-gray-900">Acme@enterprise.com</div>
                </div>
                <div className="p-3">
                  <div className="text-gray-500 mb-3">Due date</div>
                  <div className="text-gray-900 text-xl">-</div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-300">
                <div className="text-gray-500 mb-3">Address</div>
                <div className="text-gray-900 text-xl">-</div>
              </div>
            </div>
            <table className="w-full mt-5 text-left border">
              <thead className="border-b-1">
                <tr className="bg-[#fafafa] m-5">
                  <th>Item</th>
                  <th>QTY</th>
                  <th>Rate</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item}</td>
                    <td>{item.qty}</td>
                    <td>{item.rate}</td>
                    <td>{item.tax}</td>
                    <td>{item.qty * item.rate * (item.tax / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </>
  )
}

export default InvoicePreview