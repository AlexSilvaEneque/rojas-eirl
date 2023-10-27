import type { H3Event } from "h3";
import { getClientById, updateClient } from "~/server/controllers/client";
import { Client, CreateClient } from "~/server/interfaces/cliente";

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
            statusCode: 404,
            statusMessage: 'El client no existe'
        })
    }

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

    client.name = body.name
    client.email = body.email!
    client.address = body.address!
    client.phone = body.phone!
    client.type = body.type

    try {
        await updateClient(client)
        return {
            message: 'Cliente actualizado'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al actualizar'
        }
    }
})