import type { H3Event } from "h3";
import { getAllCategoryById, updateCategory } from "~/server/controllers/category";
import { Category, CreateCategory } from "~/server/interfaces/category";
import { isValidObjectId } from '~/server/utils';

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

    category.name = name

    try {
        await updateCategory(category)
        return {
            message: 'Categoria actualizada'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al actualizar'
        }
    }
})