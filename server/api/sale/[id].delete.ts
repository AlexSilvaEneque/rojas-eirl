import type { H3Event } from "h3";
import { SaleById } from '../../../interface/sale';
import { getSalesById, deleteSale } from '../../controllers/sale';

export default defineEventHandler(async (event : H3Event) => {
    const { id } = event.context.params!

    if (!isValidObjectId(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El ID no es válido'
        })
    }

    const sale : SaleById | null = await getSalesById(id)

    if (!sale) {
        throw createError({
            statusCode: 404,
            statusMessage: 'La venta no existe'
        })
    }

    try {
        await deleteSale(sale.id)
        return {
            message: 'Venta eliminada'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al eliminar'
        }
    }
})