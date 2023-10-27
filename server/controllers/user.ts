import prisma from "."
import { CreateUser, User } from "../interfaces/user"

export const allUser = () : Promise<User[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            status: true,
            role: {
                select: {
                    description: true
                }
            }
        }
    })
}

export const userByEmail = (email : string) : Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            email
        },
        include: {
            role: true
        }
    })
}

export const userById = (id : string) : Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            address: true,
            role: {
                select: {
                    description: true
                }
            }
        }
    })
}

export const register = (user : CreateUser) => {
    return prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            password: user.password,
            roleId: user.roleId
        }
    })
}

export const updateUser = (user : User) => {
    return prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            password: user.password,
            roleId: user.roleId
        }
    })
}

export const deleteUser = (user : User) => {
    return prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            status: false
        }
    })
}

export const enableUser = (user : User) => {
    return prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            status: true
        }
    })
}