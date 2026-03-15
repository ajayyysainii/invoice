import api from './axios'

export interface CatalogItemPayload {
    name: string
    price: number
    tax?: number
    discount?: number
    buyerId?: string | null
}

export interface CatalogItem {
    _id: string
    userId: string
    name: string
    price: number
    tax: number
    discount: number
    buyerId: { _id: string; nameOfBusiness: string; name: string } | string | null
    createdAt: string
    updatedAt: string
}

export async function createCatalogItem(payload: CatalogItemPayload): Promise<CatalogItem> {
    const response = await api.post('/itemCatalog/create', payload)
    return response.data.item as CatalogItem
}

export async function listCatalogItems(): Promise<CatalogItem[]> {
    const response = await api.get('/itemCatalog/list')
    return response.data.items as CatalogItem[]
}

export async function getCatalogItemsForBuyer(buyerId: string): Promise<CatalogItem[]> {
    const response = await api.get(`/itemCatalog/list/${buyerId}`)
    return response.data.items as CatalogItem[]
}

export async function deleteCatalogItem(itemId: string): Promise<void> {
    await api.delete(`/itemCatalog/delete/${itemId}`)
}
