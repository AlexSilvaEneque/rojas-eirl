import type { H3Event } from 'h3';
import { countProducts, mostSelledProducts } from '~/server/controllers/product';
import { countSales, reportsSaleAgo, totalSale } from '~/server/controllers/sale';
import { countClients } from '~/server/controllers/client';

export default defineEventHandler(async (event: H3Event) => {
    const countSale = await countSales()
    const countProduct = await countProducts()
    const countClient = await countClients()
    const amountSale = await totalSale()
    
    const productsSales = await mostSelledProducts()
    
    const sales = await reportsSaleAgo()

    return {
        countSale,
        countProduct,
        countClient,
        amountSale,
        productsSales,
        sales
    }
})