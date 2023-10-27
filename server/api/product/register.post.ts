import type { H3Event } from "h3";
import { registerProduct } from "~/server/controllers/product";
import { CreateProduct } from "~/server/interfaces/product";

export default defineEventHandler(async (event : H3Event) => {
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

    try {
        await registerProduct(body)
        return {
            message: 'Producto registrado'
        }
    } catch (error) {
        console.log(error)
        return {
            statusMessage: 'Error al registrar'
        }
    }
})