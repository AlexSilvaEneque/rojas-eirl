import type { H3Event } from 'h3';
import { reportsSale } from '~/server/controllers/sale';
import { converttoDDMMYYYY } from '~/utils';

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody<{start: string, end: string}>(event)
    
    if (!body.start && !body.end) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Faltan las fechas'
        })
    }
    
    const startFormat = `${body.start.split("/")[2]}-${body.start.split("/")[1]}-${body.start.split("/")[0]}`
    const obj1 = new Date(startFormat)
    const startISO = obj1.toISOString()

    const endFormat = `${body.end.split("/")[2]}-${body.end.split("/")[1]}-${body.end.split("/")[0]}`
    const obj2 = new Date(endFormat)
    const endISO = obj2.toISOString().split("T")[0] + "T23:59:59.999Z"

    const res = await reportsSale(startISO, endISO)
    
    const group1 = res.reduce((groups: Array<{[key:string]: {date: string}}>, sale) => {
        const d = converttoDDMMYYYY(sale.date)
        const index = groups.findIndex(group => group[d]);
    
        if (index === -1) {
            groups.push({ [d]: { date: converttoDDMMYYYY(sale.date) } });
        } else {
            groups[index][d].date = converttoDDMMYYYY(sale.date);
        }
    
        return groups;
    }, [])
    
    const group2 = res.reduce((groups: Array<{[key:string]: {total: number}}>, sale) => {
        const d = converttoDDMMYYYY(sale.date)
        const index = groups.findIndex(group => group[d]);
    
        if (index === -1) {
            groups.push({ [d]: { total: sale.total } });
        } else {
            groups[index][d].total += sale.total;
        }
    
        return groups;
    }, [])

    return {group1, group2}
})