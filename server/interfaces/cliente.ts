import { TypeClient } from "@prisma/client"

export interface Client {
    id: string
    name: string
    email: string | null
    address: string | null
    phone: string | null
    type: TypeClient
    status: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface CreateClient {
    id?: string
    name: string
    email?: string
    address?: string
    phone?: string
    type: TypeClient
    status: boolean
}

export interface ClientEnables {
    id: string
    name: string
}