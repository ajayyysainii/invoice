"use client"

import React, { PropsWithChildren, useState } from "react";
import InvoiceContext, { InvoiceFormValues } from "./InvoiceContext";

const InvoiceContextProvider = ({ children }: PropsWithChildren) => {
    const [invoiceData, setInvoiceData] = useState<InvoiceFormValues | null>(null);
    const [grandTotal, setGrandTotal] = useState<number>(0);
    
    return (
        <InvoiceContext.Provider value={{ invoiceData, setInvoiceData, grandTotal, setGrandTotal }}>
            {children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceContextProvider;