import type { H3Event } from "h3";
import { getAllClients } from "~/server/controllers/client";
import { Client } from "~/server/interfaces/cliente";

export default defineEventHandler(async (event : H3Event) => {
    const clients : Client[] = await getAllClients()

    return clients
})