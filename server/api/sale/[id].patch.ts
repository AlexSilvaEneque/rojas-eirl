import type { H3Event } from 'h3';
import { SaleById } from '~/interface/sale';
import { getConfi, getConfigById, updateCorrelativo } from '~/server/controllers/config';
import { getSalesById, registerPaid } from '~/server/controllers/sale';

export default defineEventHandler(async (event: H3Event) => {
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

    const body : { paid: number, state: number, numberNota: string } = await readBody(event)

    try {
        await registerPaid(id, body.paid, body.state, body.numberNota)

        if (body.numberNota) {
            const res = await getConfi()
            const config = await getConfigById(res[0].id)
            const valueFinal: number = Number(config?.value!) + 1
            await updateCorrelativo(config?.id!, valueFinal)
        }

        return {
            message: 'Pago registrado'
        }
    } catch (error) {
        return {
            statusMessage: 'Error al registrar pago'
        }
    }

})