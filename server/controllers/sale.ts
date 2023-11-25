import prisma from ".";
import { CreateSale } from '../interfaces/sale';

export const getAllSales = () => {
    return prisma.sale.findMany({
        orderBy: {
            date: 'desc'
        },
        select: {
            id: true,
            date: true,
            statusSale: true,
            status: true,
            total: true,
            client: {
                select: {
                    name: true
                }
            }
        }
    })
}

export const getSalesById = (id: string) => {
    return prisma.sale.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            date: true,
            total: true,
            status: true,
            statusSale: true,
            paid: true,
            user: {
                select: {
                    name: true
                }
            },
            client: {
                select: {
                    name: true
                }
            },
            details: {
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price_sale: true
                        }
                    }
                }
            }
        }
    })
}

export const registerSale = (sale: CreateSale) => {
    return prisma.sale.create({
        data: {
            userId: sale.userId,
            clientId: sale.clientId,
            total: sale.total
        }
    })
}

export const updateTotal = (paramId: string, paramTotal: number) => {
    return prisma.sale.update({
        where: {
            id: paramId
        },
        data: {
            total: paramTotal
        }
    })
}

export const reportsSale = (start: string, end: string) => {
    return prisma.sale.findMany({
        where: {
            date: {
                gte: start,
                lte: end
            }
        }
    })
}

export const registerPaid = (id: string, mount: number, state: number) => {
    return prisma.sale.update({
        where: {
            id
        },
        data: {
            paid: mount,
            statusSale: state
        }
    })
}

export const deleteSale = (id: string) => {
    return prisma.sale.update({
        where: {
            id
        },
        data: {
            status: false
        }
    })
}