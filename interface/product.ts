import { CreateCategory } from "./category"

export interface Product {
    id: string
    name: string
    price_sale: number
    price_purchase: number
    stock: number
    status: boolean
    createdAt: Date
    updatedAt: Date
    categoryId: string
    category?: CreateCategory
}

export interface CreateProduct {
    id?: string
    name: string
    stock: number
    price_sale: number
    price_purchase: number
    categoryId: string
    category: string
}