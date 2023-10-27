import { H3Event } from "h3";
import { updateUser, userById } from "~/server/controllers/user"
import { CreateUser, User } from "~/server/interfaces/user";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

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
            message: 'Envie los campos obligatorios'
        })
    }

    const { name, email, password, roleId, address, phone } = body

    if (!name || !email || !password || !roleId) {
        throw createError({
            statusCode: 401,
            message: 'Envie los campos obligatorios'
        })
    }
    
    let hash : string = await bcrypt.hash(password, 10)

    user.name = name
    user.email = email
    user.address = address
    user.phone = phone
    user.password = hash
    user.roleId = roleId
    
    try {
        await updateUser(user)
        return {
            msg: 'Datos actualizados'
        }
    } catch (error) {
        return {
            msg: 'Error al actualizar'
        }
    }
})