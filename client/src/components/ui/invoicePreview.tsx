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
  const setGrandTotal = invoiceContext?.setGrandTotal;
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
  const grandTotal = items.reduce((acc, currentItem) => {
    const quantity = Number(currentItem.quantity) || 0;
    const discount = Number(currentItem.discount) || 0;
    const tax = Number(currentItem.tax) || 0;
    const price = Number(currentItem.price) || 0;
    const subtotal = price * quantity;
    const taxAmount = subtotal * (tax / 100);
    const preDiscountTotal = subtotal + taxAmount;
    const discountAmount = preDiscountTotal * (discount / 100);
    const total = preDiscountTotal - discountAmount;
    return acc + total;
  }, 0);

  useEffect(() => {
    if (setGrandTotal) {
      setGrandTotal(grandTotal);
    }
  }, [grandTotal, setGrandTotal]);

  

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
              {buyerData?.address || ''}
            </div>
          </div>
        </div>
        <table className="w-full mt-5 text-left border">
          <thead className="border-b-1">
            <tr className="bg-[#fafafa] m-5">
              <th>Item</th>
              <th>Price</th>
              <th>QTY</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="">
            {items.map((item, idx) => {
              const quantity = Number(item.quantity) || 0;
              const discount = Number(item.discount) || 0;
              const tax = Number(item.tax) || 0;
              const price = Number(item.price) || 0;
              const subtotal = price * quantity;
              const taxAmount = subtotal * (tax / 100);
              const preDiscountTotal = subtotal + taxAmount;
              const discountAmount = preDiscountTotal * (discount / 100);
              const total = preDiscountTotal - discountAmount;
              return (
                <tr key={idx}>
                  <td>{item.item}</td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>{tax}</td>
                  <td>{discount}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full mt-4 flex justify-end">
          <div className="text-right">
            <div className="text-gray-500">Total</div>
            <div className="text-2xl font-semibold">{grandTotal}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoicePreview