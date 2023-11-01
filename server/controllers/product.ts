import prisma from ".";
import { CreateProduct, Product } from "../interfaces/product";

export const getAllProducts = () : Promise<Product[]> => {
    return prisma.product.findMany()
}

export const getProductById = (id: string) : Promise<Product | null> => {
    return prisma.product.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            price_purchase: true,
            price_sale: true,
            stock: true,
            status: true,
            categoryId: true,
            category: {
                select: {
                    name: true
                }
            }
        }
    })
}

export const registerProduct = (product : CreateProduct) => {
    console.log(product)
    return prisma.product.create({
        data: {
            name: product.name,
            stock: product.stock,
            price_sale: product.price_sale,
            price_purchase: product.price_purchase,
            categoryId: product.categoryId
        }
    })
}

export const updateProduct = (product: CreateProduct) => {
    return prisma.product.update({
        where: {
            id: product.id
        },
        data: {
            name: product.name,
            stock: product.stock,
            price_sale: product.price_sale,
            price_purchase: product.price_purchase,
            categoryId: product.categoryId
        }
    })
}

export const newEntryProduct = (product: CreateProduct) => {
    return prisma.product.update({
        where: {
            id: product.id
        },
        data: {
            name: product.name,
            stock: product.stock,
            price_sale: product.price_sale,
            price_purchase: product.price_purchase,
            categoryId: product.categoryId
        }
    })
}

export const deleteProduct = (product: Product) => {
    return prisma.product.update({
        where:{
            id: product.id
        },
        data: {
            status: false
        }
    })
}

export const enableProduct = (product: Product) => {
    return prisma.product.update({
        where:{
            id: product.id
        },
        data: {
            status: true
        }
    })
}  