import { CreateRole } from "../interfaces/role"

export interface User {
    id: string
    name: string
    email?: string
    phone?: string | null
    address?: string | null
    password?: string
    status?: boolean
    createdAt?: Date
    updatedAt?: Date
    roleId?: string
    role?: CreateRole
}

export interface CreateUser {
    name: string
    email: string
    phone?: string
    address?: string
    password: string
    roleId: string
}