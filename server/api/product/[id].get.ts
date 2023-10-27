import type { H3Event } from "h3";
import { getProductById } from "~/server/controllers/product";
import { Product } from "~/server/interfaces/product";
import { isValidObjectId } from "~/server/utils";

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }

    const product : Product | null = await getProductById(id)

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'El producto no existe'
        })
    }

    return product
})