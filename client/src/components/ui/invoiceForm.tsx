"use client"
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    invoice: string,
    dueDate: string
};

interface InvoiceFormProps {
    onInvoiceNumberChange?: (value: string) => void;
}

const InvoiceForm = ({ onInvoiceNumberChange }: InvoiceFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const handleInvoiceChange = (event) => {
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
                <label htmlFor="dueDate">Due Date:</label>
                <input type="date" {...register('dueDate')} />
                </div>
               
                <input className="bg-blue-600 px-2 text-white font-semibold" type="submit" />
            </form>

        </>

    )
}

export default InvoiceForm