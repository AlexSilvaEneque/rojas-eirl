import type { H3Event } from "h3";
import { getCategoryByName, registerCategory } from "~/server/controllers/category";
import { Category, CreateCategory } from "~/server/interfaces/category";

export default defineEventHandler(async (event : H3Event) => {
    const body : CreateCategory = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    const { name } = body

    if (!name) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envie los campos obligatorios'
        })
    }

    const isExists : Category | null = await getCategoryByName(name)

    if (isExists) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Ya existe una categoria con el mismo nombre'
        })
    }

    try {
        await registerCategory(body)
        return {
            message: 'Categoria registrada'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al registrar'
        }
    }
    
})