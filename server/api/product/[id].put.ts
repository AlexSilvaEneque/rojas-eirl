import type { H3Event } from "h3";
import { getProductById, updateProduct } from "~/server/controllers/product";
import { CreateProduct, Product } from "~/server/interfaces/product";
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

    const body : CreateProduct = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    if (Object.keys(body).length < 5 || Object.values(body).includes('')) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    product.name = body.name
    product.stock = body.stock
    product.price_purchase = body.price_purchase
    product.price_sale = body.price_sale
    product.categoryId = body.categoryId

    try {
        await updateProduct(product)
        return {
            message: 'Producto actualizado'
        }
    } catch (error) {
        console.log(error)
        return {
            statusMessage: 'Error al actualizar'
        }
    }
})