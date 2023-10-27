import type { H3Event } from "h3";
import { getClientById } from "~/server/controllers/client";
import { Client } from "~/server/interfaces/cliente";

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }
    const client : Client | null = await getClientById(id)

    if (!client) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El cliente no existe'
        })
    }

    return client
})