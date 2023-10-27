import type { H3Event } from 'h3';
import { getCategoriesEnable } from '~/server/controllers/category';
import { Category } from '~/server/interfaces/category';

export default defineEventHandler(async (event : H3Event) => {
    const categories : Category[] = await getCategoriesEnable()
    return categories
})