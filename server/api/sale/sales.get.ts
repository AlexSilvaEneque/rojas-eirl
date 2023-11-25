import type { H3Event } from 'h3';
import { getAllSales } from '~/server/controllers/sale';

export default defineEventHandler(async (event: H3Event) => {
    const sales = await getAllSales()
    return sales
})