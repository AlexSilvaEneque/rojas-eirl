import type { H3Event } from "h3";
import { roleById, updateRole } from "~/server/controllers/role";
import { CreateRole, Role } from "~/server/interfaces/role";
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
            statusMessage: 'El rol no existe'
        })
    }

    const body : CreateRole = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 401,
            message: 'Envie los campos obligatorios'
        })
    }

    const { description } = body

    if (!description) {
        throw createError({
            statusCode: 401,
            message: 'Envie los campos obligatorios'
        })
    }
    
    role.description = description
    
    try {
        await updateRole(role)
        return {
            statusMessage: 'Rol actualizado'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al actualizar'
        }
    }
})