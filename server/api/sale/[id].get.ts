import type { H3Event } from "h3"
import { getSalesById } from "~/server/controllers/sale"

export default defineEventHandler(async (event: H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }

    const sale = await getSalesById(id)

    if (!sale) {
        throw createError({
            statusCode: 404,
            statusMessage: 'La venta no existe'
        })
    }

    return sale
})