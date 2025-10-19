import api from './axios'
import { InvoiceItem } from '@/context/InvoiceContext'

export interface InvoicePayload {
    invoice: string
    dueDate: string
    buyerId?: string
    items?: InvoiceItem[]
    totalAmount?: number
}

export async function createInvoice(payload: InvoicePayload): Promise<void> {
    await api.post('/invoice/create', payload)
}

export interface Invoice extends Partial<InvoicePayload> {
    id?: string
    _id?: string
}

export async function listInvoices(): Promise<Invoice[]> {
    const response = await api.get('/invoice/list')
    return response.data.message as Invoice[]
}


