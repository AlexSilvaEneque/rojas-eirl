import type { H3Event } from 'h3';
import { getClientsEnables } from '~/server/controllers/client';
import { ClientEnables } from '~/server/interfaces/cliente';

export default defineEventHandler(async (event : H3Event) => {
    const clients : ClientEnables[] = await getClientsEnables()
    return clients
})