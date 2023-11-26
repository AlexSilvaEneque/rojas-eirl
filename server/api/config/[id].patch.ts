import type { H3Event } from 'h3';
import { getConfigById, updateCorrelativo } from '~/server/controllers/config';

export default defineEventHandler(async (event: H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }

    const config = await getConfigById(id)

    if (!config) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Registro no encontrado'
        })
    }

    const body : { value: number } = await readBody(event)

    if (body.value <= 0) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Ingrese un valor válido mayor a 0'
        })
    }

    try {
        await updateCorrelativo(config.id, Number(body.value))
        return {
            message: 'Registro actulizado'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al actualizar'
        }
    }
})