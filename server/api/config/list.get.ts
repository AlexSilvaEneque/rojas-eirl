import { H3Event } from 'h3';
import { getConfi } from '~/server/controllers/config';

export default defineEventHandler(async (event: H3Event) => {
    const config = await getConfi()
    return config
})