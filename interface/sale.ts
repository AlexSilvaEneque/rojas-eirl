export interface CreateSale {
    userId: string
    clientId: string
    total: number
    detail: CreateDetail[]
}

export interface CreateDetail {
    quantity: number
    price: number
    productId: string
    saleId?: string
}

export interface SaleAll {
    id: string
    date: Date
    statusSale: number
    status: boolean
    total: number
    client: {
        name: string
    }
}

export interface SaleById {
    id: string
    date: Date
    status: boolean
    statusSale: number
    total: number
    user: {
        name: string
    },
    client: {
        name: string
    },
    paid: number | null
    details: Detail[]
}

interface Detail {
    id: string
    quantity: number
    product: {
        id: string
        name: string
        price_sale: number
    }
}