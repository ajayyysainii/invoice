import React from "react";

export type InvoiceItem = {
    item: string;
    quantity: number;
    rate: number;
    tax: number;
    total: number;
};

export type InvoiceFormValues = {
    invoice: string;
    dueDate: string;
    address: string;
    buyerId: string;
    items: InvoiceItem[];
};

export type InvoiceContextType = {
    invoiceData: InvoiceFormValues | null;
    setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceFormValues | null>>;
};

const InvoiceContext = React.createContext<InvoiceContextType | undefined>(undefined);

export default InvoiceContext;