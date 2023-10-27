import type { H3Event } from "h3";
import { getAllCategoryById } from "~/server/controllers/category";
import { Category } from "~/server/interfaces/category";
import { isValidObjectId } from "~/server/utils";

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            message: 'El ID no es válido'
        })
    }

    const category : Category | null = await getAllCategoryById(id)

    if (!category) {
        throw createError({
            statusCode: 404,
            message: 'La categoría no existe'
        })
    }

    return category
})