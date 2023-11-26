import type { H3Event } from 'h3';
import { registerConfiguration } from '~/server/controllers/config';

export default defineEventHandler(async (event: H3Event) => {
    const body : { description: string, value: number } = await readBody(event)

    if (Object.values(body).includes('')) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envíe todos los campos'
        })
    }

    try {
        await registerConfiguration(body.description, body.value)
        return {
            message: 'Registrado con éxito'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al crear!'
        }
    }
})