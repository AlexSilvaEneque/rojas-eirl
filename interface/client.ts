import { TypeClient } from "@prisma/client"

export interface Client {
    id: string
    name: string
    email: string
    address: string | null
    phone: string | null
    type: TypeClient
    status: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateClient {
    id?: string
    name: string
    email: string
    address: string
    phone: string
    type: TypeClient
    desType?: string
}