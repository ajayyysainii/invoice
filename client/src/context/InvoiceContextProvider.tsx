"use client"

import React, { useState } from "react";
import InvoiceContext from "./InvoiceContext";

const InvoiceContextProvider = ({ children }) => {
    const [invoiceData, setInvoiceData] = useState(null);
    
    return (
        <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
            {children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceContextProvider;