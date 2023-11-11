import type { H3Event } from "h3";
import { enableUser, userById } from "~/server/controllers/user";
import { User } from "~/server/interfaces/user";

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

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
            statusMessage: 'El usuario no existe'
        })
    }

    try {
        await enableUser(user)
        return {
            message: 'Usuario habilitado'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al habilitar'
        }
    }
})