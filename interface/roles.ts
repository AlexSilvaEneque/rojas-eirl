export interface Role {
    id?: string
    description: string
    status: boolean
}

export interface EditRole {
    rol: Role,
    isOpenEdit: Boolean
}