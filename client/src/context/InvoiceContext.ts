import React from "react";

export type InvoiceItem = {
    item: string;
    quantity: number;
    discount: number;
    tax: number;
    price: number;
};

export type InvoiceFormValues = {
    invoice: string;
    dueDate: string;
    address: string;
    totalAmount: number;
    buyerId: string;
    items: InvoiceItem[];
};

export type InvoiceContextType = {
    invoiceData: InvoiceFormValues | null;
    setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceFormValues | null>>;
    grandTotal: number;
    setGrandTotal: React.Dispatch<React.SetStateAction<number>>;
};

const InvoiceContext = React.createContext<InvoiceContextType | undefined>(undefined);

export default InvoiceContext;