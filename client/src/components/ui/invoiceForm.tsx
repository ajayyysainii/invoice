"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { createInvoice } from "@/api/invoice";
import { useEffect, useState, useContext } from "react";
import { getBuyers, Buyer } from "@/api/buyers";
import InvoiceContext, { InvoiceFormValues } from "@/context/InvoiceContext";
import { X, Plus, Calculator } from "lucide-react";

type FormValues = InvoiceFormValues;

const InvoiceForm = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  const contextValue = useContext(InvoiceContext);
  const setInvoiceData = contextValue?.setInvoiceData;
  const grandTotal = contextValue?.grandTotal ?? 0;

  useEffect(() => {
    (async () => {
      try {
        const list = await getBuyers();
        setBuyers(list);
      } catch (error) {
        console.error("Failed to load buyers", error);
      }
    })();
  }, []);

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      invoice: "",
      dueDate: "",
      buyerId: "",
      items: [{ item: "", quantity: 0, price: 0, tax: 0, discount: 0 }],
    },
  });

  // Watch all form values and sync to context on every change
  const watchedFormValues = watch();
  useEffect(() => {
    if (setInvoiceData) {
      setInvoiceData({ ...watchedFormValues });
    }
  }, [watchedFormValues, setInvoiceData]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    await createInvoice({
      ...data,
      totalAmount: grandTotal,
    });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Calculate total for each row
  const calculateRowTotal = (index: number) => {
    const items = watch("items");
    if (!items || !items[index]) return "0.00";
    const { price = 0, quantity = 0, tax = 0, discount = 0 } = items[index];
    const subtotal = Number(price) * Number(quantity);
    const taxAmount = (subtotal * Number(tax)) / 100;
    const discounted = (taxAmount + subtotal) * (Number(discount) / 100);
    const total = subtotal + taxAmount - Number(discounted);
    return total.toFixed(2);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-white to-gray-50 w-full max-w-7xl mx-auto rounded-2xl shadow-2xl shadow-gray-200/50">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Create Invoice
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate a new invoice for your customer
          </p>
        </div>

        {/* Form Container */}
        <div className="px-8 py-6 space-y-6">
          {/* Invoice Details Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Invoice Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Invoice Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number
                </label>
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="text"
                    id="randomGenerate"
                    placeholder="INV-001"
                    {...register("invoice")}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                  <div
                
                    className="bg-blue-500 rounded-full cursor-pointer w-[25px] h-[20px]"
                  ></div>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  {...register("dueDate")}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              {/* Buyer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Buyer
                </label>
                <div className="relative">
                  <select
                    {...register("buyerId")}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer pr-10"
                  >
                    <option value="">Choose a buyer</option>
                    {buyers.map((buyer) => (
                      <option
                        key={buyer._id || buyer.id}
                        value={buyer._id || buyer.id}
                      >
                        {buyer.nameOfBusiness || buyer.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Line Items
              </h2>
              <button
                type="button"
                onClick={() =>
                  append({
                    item: "",
                    price: 0,
                    quantity: 0,
                    tax: 0,
                    discount: 0,
                  })
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">
                      Item
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]">
                      Tax %
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                      Total
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {fields.map((field, index) => (
                    <tr
                      key={field.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Item name"
                          {...register(`items.${index}.item`)}
                          className="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...register(`items.${index}.price`)}
                          className="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`items.${index}.quantity`)}
                          className="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0"
                          {...register(`items.${index}.tax`)}
                          className="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...register(`items.${index}.discount`)}
                          className="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-medium">
                          ₹{calculateRowTotal(index)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                          className="inline-flex items-center justify-center w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                          title="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleFormSubmit}
              className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
