import type { H3Event } from "h3";
import { deleteCategory, getAllCategoryById } from "~/server/controllers/category";
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
        await deleteCategory(category)
        return {
            message: 'Categoria eliminada'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al eliminar la categoria'
        }
    }
})