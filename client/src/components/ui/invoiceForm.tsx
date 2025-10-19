"use client"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { createInvoice } from '@/api/invoice'

import { useEffect, useState, useContext } from "react";
import { getBuyers, Buyer } from "@/api/buyers";
import InvoiceContext, { InvoiceFormValues } from "@/context/InvoiceContext";
// import InvoiceContext from "@/context/InvoiceContext";



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
                console.error('Failed to load buyers', error);
            }
        })();
    }, [])

    const { register, handleSubmit, control, watch } = useForm<FormValues>({
        defaultValues: {
            invoice: '',
            dueDate: '',
            buyerId: '',
            items: [{ item: '', quantity: 0, price: 0, tax: 0, discount: 0 }],
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
        console.log(data)
        await createInvoice({
            ...data,
            totalAmount: grandTotal
        })
    };



    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });


    return (
        <>
            <div>invoiceForm</div>

            <form className="bg-amber-300" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        placeholder="enter invoice number"
                        {...register('invoice')}

                    />

                </div>
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input type="date" {...register('dueDate')} />
                </div>

                <div>
                    <select {...register('buyerId')}>
                        <option value="">Select buyer</option>
                        {buyers.map((buyer) => (
                            <option key={buyer._id || buyer.id} value={buyer._id || buyer.id}>
                                {buyer.nameOfBusiness || buyer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-[90%] border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-2 py-1 text-left">Item</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Price</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Quantity</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Tax</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Discount</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id}>
                                    <td className="border border-gray-300 px-2 py-1">
                                        <input type="text" className="w-full border-none outline-none" {...register(`items.${index}.item`)} />
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        <input type="number" className="w-full border-none outline-none" {...register(`items.${index}.price`)} />
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        <input type="number" className="w-full border-none outline-none" {...register(`items.${index}.quantity`)} />
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        <input type="number" className="w-full border-none outline-none" {...register(`items.${index}.tax`)} />
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        <input type="number" className="w-full border-none outline-none" {...register(`items.${index}.discount`)} />
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                            onClick={() => remove(index)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" onClick={() => append({ item: '', price: 0, quantity: 0, tax: 0, discount: 0 })}>
                        Add Item
                    </button>
                </div>

                <input className="bg-blue-600 px-2 text-white font-semibold" type="submit" />
            </form>

        </>

    )
}

export default InvoiceForm;