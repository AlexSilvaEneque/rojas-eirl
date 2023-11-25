export interface CreateSale {
    userId: string
    clientId: string
    total: number
}

export interface CreateDetail {
    quantity: number
    productId: string
    saleId?: string
}