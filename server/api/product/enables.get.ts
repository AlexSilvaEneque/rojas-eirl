import type { H3Event } from "h3"
import { ProductEnables } from "~/interface/product"
import { getProductEnables } from "~/server/controllers/product"

export default defineEventHandler(async (event : H3Event) => {
    const product : ProductEnables[] = await getProductEnables()
    return product
})