"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { createInvoice } from '@/api/invoice'
import { useEffect, useState, useContext } from "react";
import { getBuyers, Buyer } from "@/api/buyers";
import InvoiceContext from "@/context/InvoiceContext";



type Inputs = {
    invoice: string,
    dueDate: string
    address: string
};

interface InvoiceFormProps {
    onInvoiceNumberChange?: (value: string) => void;
}

const InvoiceForm = ({ onInvoiceNumberChange }: InvoiceFormProps) => {
    
    const [buyers, setBuyers] = useState<Buyer[]>([]);

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

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        await createInvoice(data)
    };

    const handleInvoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        console.log(value);
        onInvoiceNumberChange?.(value);
    }
    return (
        <>
            <div>invoiceForm</div>

            <form className="bg-amber-300" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        placeholder="enter invoice number"
                        {...register('invoice')}
                        onChange={handleInvoiceChange}
                    />

                </div>
                <div>
                    <input
                        placeholder="enter address"
                        {...register('address')}
                    />

                </div>

                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input type="date" {...register('dueDate')} />
                </div>

                <div>
                    <select>
                        <option value="">Select buyer</option>
                        {buyers.map((buyer) => (
                            <option key={buyer._id || buyer.id} value={buyer._id || buyer.id}>
                                {buyer.nameOfBusiness || buyer.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input className="bg-blue-600 px-2 text-white font-semibold" type="submit" />
            </form>

        </>

    )
}

export default InvoiceForm