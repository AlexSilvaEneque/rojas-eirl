import type { H3Event } from 'h3';
import { updateUser, userById } from '~/server/controllers/user';
import { CreateUser, User } from '~/server/interfaces/user';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event : H3Event) => {
    const id: string = event.context.params!.id.split('/')[1]

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }

    const user : User | null = await userById(id)
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Usuario no encontrado'
        })
    }
    const body : CreateUser = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    const { name, email, password, address, phone } = body

    if (!name || !email) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    if (password) {
        let hash : string = await bcrypt.hash(password, 10)
        user.password = hash    
    }
    

    user.name = name
    user.email = email
    user.phone = phone
    user.address = address
    
    try {
        await updateUser(user)
        return {
            message: 'Datos del perfil actualizados'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al actualizar'
        }
    }
})