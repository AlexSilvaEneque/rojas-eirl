import type { H3Event } from 'h3';
import { CreateDetail, CreateSale } from '~/interface/sale';
import { registerSale, updateTotal } from '~/server/controllers/sale';
import { reduceStock, registerDetail } from '~/server/controllers/detail';
import { getProductById } from '~/server/controllers/product';

export default defineEventHandler(async (event: H3Event) => {
    const body : CreateSale = await readBody(event)

    if (!body.clientId || !body.userId || !body.total) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Envíe los campos obligatorios'
        })
    }

    // console.log(body)
    // return

    try {
        const sale = await registerSale(body)
        let total: number = 0
        body.detail.forEach(async (item) => {
            const sendData : CreateDetail = {
                quantity: Number(item.quantity),
                price: Number(item.price),
                productId: item.productId,
                saleId: sale.id
            }

            total += sendData.quantity * sendData.price
            await registerDetail(sendData)

            const product = await getProductById(sendData.productId)
            product!.stock = product!.stock - sendData.quantity
            await reduceStock(product!.id, product!.stock)
        })
        
        await updateTotal(sale.id, total)

        return {
            message: 'Venta registrada',
            id: sale.id
        }
    } catch (error) {
        return {
            statusMessage: 'Error al registrar'
        }
    }
})