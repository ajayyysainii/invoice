import api from './axios'

export interface BuyerPayload {
    gst: string
    address: string
    nameOfBusiness: string
    email: string
    name: string
    phone: number
}

export interface Buyer extends Partial<BuyerPayload> {
    id?: string
    _id?: string
}

export async function getBuyers(): Promise<Buyer[]> {
    const response = await api.get('/buyer/list')
    return response.data.message as Buyer[]
}

export async function createBuyer(payload: BuyerPayload): Promise<void> {
    await api.post('/buyer/create', payload)
}

export async function getBuyerDetail(buyerId: string): Promise<Buyer> {
    const response = await api.get(`/buyer/detail/${buyerId}`)
    return response.data.message as Buyer
}




