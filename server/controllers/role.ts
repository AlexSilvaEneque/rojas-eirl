import prisma from ".";
import { CreateRole, Role } from "../interfaces/role";

export const allRoles = () : Promise<Role[]> => {
    return prisma.role.findMany()
}

export const roleById = (id : string) : Promise<Role | null> => {
    return prisma.role.findUnique({
        where: {
            id
        }
    })
}

export const roleByDescription = (description : string) : Promise<Role | null> => {
    return prisma.role.findUnique({
        where: {
            description
        }
    })
}

export const registerRole = (role : CreateRole) => {
    return prisma.role.create({
        data: {
            description: role.description
        }
    })
}

export const updateRole = (role : Role) => {
    return prisma.role.update({
        where: {
            id: role.id
        },
        data: {
            description: role.description
        }
    })
}

export const deleteRole = (role : Role) => {
    return prisma.role.update({
        where: {
            id: role.id
        },
        data: {
            status: false
        }
    })
}

export const enableRole = (role : Role) => {
    return prisma.role.update({
        where: {
            id: role.id
        },
        data: {
            status: true
        }
    })
}