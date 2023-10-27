import type { H3Event } from "h3";
import { getAllProducts } from "~/server/controllers/product";
import { Product } from "~/server/interfaces/product";

export default defineEventHandler(async (event : H3Event) => {
    const products : Product[] = await getAllProducts()

    return products
})