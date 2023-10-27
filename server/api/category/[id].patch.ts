import type { H3Event } from "h3";
import { enableCategory, getAllCategoryById } from "~/server/controllers/category";
import { Category } from "~/server/interfaces/category";

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }

    const category : Category | null = await getAllCategoryById(id)

    if (!category) {
        throw createError({
            statusCode: 404,
            statusMessage: 'La categoría no existe'
        })
    }

    try {
        await enableCategory(category)
        return {
            message: 'Categoria habilitada'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al habilitar la categoria'
        }
    }
})