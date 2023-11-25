import prisma from ".";
import { CreateDetail } from '../interfaces/sale';

export const registerDetail = (detail: CreateDetail) => {
    return prisma.detail.create({
        data: {
            quantity: detail.quantity,
            productId: detail.productId,
            saleId: detail.saleId!
        }
    })
}

export const reduceStock = (id: string, stock: number) => {
    return prisma.product.update({
        where: {
            id
        },
        data: {
            stock
        }
    })
}