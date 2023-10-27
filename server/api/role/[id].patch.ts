import type { H3Event } from "h3";
import { enableRole, roleById } from "~/server/controllers/role";
import { Role } from "~/server/interfaces/role";
import { isValidObjectId } from '~/server/utils';

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            message: 'El ID no es válido'
        })
    }

    const role : Role | null = await roleById(id)

    if (!role) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Rol no encontrado'
        })
    }

    try {
        await enableRole(role)
        return {
            msg: 'Rol habilitado'
        }
    } catch (error) {
        return {
            msg: 'Error al habilitar'
        }
    }
})