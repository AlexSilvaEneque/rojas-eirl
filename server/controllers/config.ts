import prisma from "."

export const getConfi = () => {
    return prisma.config.findMany()
}

export const getConfigById = (id: string) => {
    return prisma.config.findUnique({
        where: {
            id
        }
    })
}

export const registerConfiguration = (description: string, value: number) => {
    return prisma.config.create({
        data: {
            description,
            value
        }
    })
}

export const updateCorrelativo = (id: string, value: number) => {
    console.log(value)
    return prisma.config.update({
        where: {
            id
        },
        data: {
            value
        }
    })
}