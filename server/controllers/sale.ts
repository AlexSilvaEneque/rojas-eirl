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
            numberNota: true,
            user: {
                select: {
                    name: true
                }
            },
            client: {
                select: {
                    name: true,
                    address: true,
                    phone: true
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

export const registerPaid = (id: string, mount: number, state: number, number: string) => {
    return prisma.sale.update({
        where: {
            id
        },
        data: {
            paid: mount,
            statusSale: state,
            numberNota: number
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

export const countSales = () => {
    return prisma.sale.count({
        where: {
            status: true
        }
    })
}

export const totalSale = () => {
    return prisma.sale.aggregate({
        _sum: {
            total: true
        },
        where: {
            status: true
        }
    })
}

export const reportsSaleAgo = () => {
    const current = new Date()
    const fiveAgo = new Date()
    fiveAgo.setMonth(fiveAgo.getMonth()-5)

    return prisma.sale.groupBy({
        by: ['date'],
        _count: true,
        where: {
            AND: [
                {
                    date: {
                        gte: fiveAgo,
                        lte: current
                    }
                },
                {
                    status: true
                }
            ]
        }
    })
}
