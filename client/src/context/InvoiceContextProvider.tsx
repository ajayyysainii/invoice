"use client"

import React, { PropsWithChildren, useState } from "react";
import InvoiceContext, { InvoiceFormValues } from "./InvoiceContext";

const InvoiceContextProvider = ({ children }: PropsWithChildren) => {
    const [invoiceData, setInvoiceData] = useState<InvoiceFormValues | null>(null);
    
    return (
        <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
            {children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceContextProvider;