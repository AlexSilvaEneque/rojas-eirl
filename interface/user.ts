export interface UserAll {
    id: string
    name: string
    status: boolean
    role: {
        description: string
    }
}

export interface User {
    id: string
    name: string
    phone: string
    email: string
    address: string
    roleId: string
    role?: {
        description: string
    }
}

export interface CreateUser {
    name: string
    email: string
    phone?: string
    address?: string
    password: string
    roleId: string
    role: string
}