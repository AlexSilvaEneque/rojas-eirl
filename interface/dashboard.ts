interface Amount {
    _sum: {
        total: number
    }
}

interface ProductData {
    name: string
    stock: number
}

interface ProductSales {
    _sum: {
        quantity: number
    },
    productId: string
    productSearch: ProductData
}

export interface SaleDash {
    _count: number
    date: string
}

export interface Result {
    countSale: number
    countProduct: number
    countClient: number
    amountSale: Amount
    productsSales: ProductSales[]
    sales: SaleDash[]
}