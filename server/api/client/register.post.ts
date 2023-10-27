import type { H3Event } from "h3";
import { registerClient } from "~/server/controllers/client";
import { Client, CreateClient } from "~/server/interfaces/cliente";

export default defineEventHandler(async (event : H3Event) => {
    const body : CreateClient = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    if (Object.keys(body).length < 2) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    try {
        await registerClient(body)
        return {
            message: 'Cliente registrado'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al registrar'
        }
    }
})