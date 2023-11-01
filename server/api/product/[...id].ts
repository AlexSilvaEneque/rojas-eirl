import type { H3Event } from "h3";
import { getProductById, newEntryProduct } from "~/server/controllers/product";
import { CreateProduct, Product } from "~/server/interfaces/product";

export default defineEventHandler(async (event: H3Event) => {
    const id: string = event.context.params!.id.split('/')[1]

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

    const { price_purchase, price_sale, stock } = body

    if (!price_purchase || !price_sale || !stock) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    product.price_purchase = price_purchase
    product.price_sale = price_sale
    product.stock = product.stock + stock

    try {
        await newEntryProduct(product)
        return {
            message: 'Nueva entrada registrada'
        }
    } catch (error) {
        console.log(error)
        return {
            statusMessage: 'Error al ingresar'
        }
    }

})