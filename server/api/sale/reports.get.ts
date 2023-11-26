import type { H3Event } from 'h3';
import { reportsSale } from '~/server/controllers/sale';
import { converttoDDMMYYYY } from '~/utils';

export default defineEventHandler(async (event: H3Event) => {
    const start = event.node.req.url!.split('?')[1].split('&')[0].split('=')[1]
    const end = event.node.req.url!.split('?')[1].split('&')[1].split('=')[1]
    
    const startFormat = `${start.split("/")[2]}-${start.split("/")[1]}-${start.split("/")[0]}`
    const obj1 = new Date(startFormat)
    const startISO = obj1.toISOString()

    const endFormat = `${end.split("/")[2]}-${end.split("/")[1]}-${end.split("/")[0]}`
    const obj2 = new Date(endFormat)
    const endISO = obj2.toISOString().split("T")[0] + "T23:59:59.999Z"
console.log(startISO)
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