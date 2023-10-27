export interface Toggle {
    toggle: Ref<boolean>,
    changeT: () => void
}

export interface Toast {
    visible: boolean
    message?: string
}

export interface IFRole {
    id?: string
    description: string
    status: boolean
}

export interface IFUser {
    id?: string
    name: string
    email: string
    phone?: string
    address?: string
    password: string
    status?: boolean
    createdAt?: Date
    updatedAt?: Date
    roleId?: string
}

export interface IFLogin {
    email: string
    password: string
}