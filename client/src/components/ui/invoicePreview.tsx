"use client"

import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import InvoiceContext from '@/context/InvoiceContext'
import { getBuyerDetail } from '@/api/buyers'

type BuyerData = {
  _id?: string;
  id?: string;
  nameOfBusiness?: string;
  name?: string;
  email?: string;
  address?: string;
} | null;

const InvoicePreview = () => {
  const invoiceContext = useContext(InvoiceContext);
  const invoiceData = invoiceContext?.invoiceData ?? null;
  const [buyerData, setBuyerData] = useState<BuyerData>(null);

  // Log only when invoiceData meaningfully changes (deep compare)
  const prevSerializedRef = useRef<string | null>(null);
  const serialized = JSON.stringify(invoiceData);
  
  const apiCall = useCallback(async () => {
    try {
      const buyersId = invoiceData?.buyerId;
      if (!buyersId) return;
      
      const response = await getBuyerDetail(buyersId);
      console.log(response);
      setBuyerData(response as unknown as BuyerData);
      return response;
    } catch (error) {
      console.error('Failed to fetch buyer details:', error);
    }
  }, [invoiceData?.buyerId]);

  useEffect(() => {
    if (prevSerializedRef.current !== serialized) {
      // Only logs on actual data changes
      console.log(invoiceData);
      prevSerializedRef.current = serialized;

      // Only call API if buyerId exists
      if (invoiceData?.buyerId) {
        apiCall();
      }
    }
  }, [serialized, invoiceData, apiCall])

  const items = invoiceData?.items ?? [];

  return (
    <>
      <h1 className="py-5 text-2xl font-semibold">Preview</h1>
      <div className="bg-white rounded-md p-4">
        <h2>Inovice</h2>
        <p>Invoice Number: {invoiceData?.invoice}</p>
        <div className="max-w-4xl bg-white border border-gray-300 rounded-lg overflow-hidden mt-5">
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-gray-300">
              <div className="text-gray-500 mb-3">Billed to</div>
              <div className="font-semibold text-xl text-gray-900 mb-1">
                {buyerData?.nameOfBusiness || buyerData?.name || 'Select buyer'}
              </div>
              <div className="text-gray-900">
                {buyerData?.email || ''}
              </div>
            </div>
            <div className="p-3">
              <div className="text-gray-500 mb-3">Due date</div>
              <div className="text-gray-900 text-xl">{invoiceData?.dueDate}</div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-300">
            <div className="text-gray-500 mb-3">Address</div>
            <div className="text-gray-900 text-xl">
              {invoiceData?.address || buyerData?.address || '-'}
            </div>
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
            {items.map((item, idx) => {
              const quantity = Number(item.quantity) || 0;
              const rate = Number(item.rate) || 0;
              const tax = Number(item.tax) || 0;
              const total = quantity * rate * (tax / 100);
              return (
                <tr key={idx}>
                  <td>{item.item}</td>
                  <td>{quantity}</td>
                  <td>{rate}</td>
                  <td>{tax}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default InvoicePreview