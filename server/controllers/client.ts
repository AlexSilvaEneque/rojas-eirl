import prisma from ".";
import { Client, CreateClient } from "../interfaces/cliente";

export const getAllClients = () : Promise<Client[]> => {
    return prisma.client.findMany()
}

export const getClientById = (id: string) : Promise<Client | null> => {
    return prisma.client.findUnique({
        where: {
            id
        }
    })
}

export const registerClient = (client : CreateClient) => {
    
    return prisma.client.create({
        data: {
            name: client.name,
            email: client.email!,
            address: client.address!,
            phone: client.phone!,
            type: client.type
        }
    })
}

export const getClientsEnables = () => {
    return prisma.client.findMany({
        where: {
            status: true
        },
        select: {
            id: true,
            name: true
        }
    })
}

export const updateClient = (client : CreateClient) => {
    return prisma.client.update({
        where: {
            id: client.id
        },
        data: {
            name: client.name,
            email: client.email!,
            address: client.address!,
            phone: client.phone!,
            type: client.type
        }
    })
}

export const deleteClient = (client : Client) => {
    return prisma.client.update({
        where: {
            id: client.id
        },
        data: {
            status: false
        }
    })
}

export const enableClient = (client : Client) => {
    return prisma.client.update({
        where: {
            id: client.id
        },
        data: {
            status: true
        }
    })
}

export const countClients = () => {
    return prisma.client.count({
        where: {
            status: true
        }
    })
}