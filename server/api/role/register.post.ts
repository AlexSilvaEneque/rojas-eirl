import type { H3Event } from "h3";
import { registerRole, roleByDescription } from "~/server/controllers/role";
import { CreateRole, Role } from "~/server/interfaces/role";

export default defineEventHandler(async (event : H3Event) => {
    const body : CreateRole = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 401,
            message: 'Envie los campos obligatorios'
        })
    }

    const { description } = body

    if (!description) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Los campos son obligatorios'
        })
    }

    const isExists : Role | null = await roleByDescription(description)

    if (isExists) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Ya existe un rol con el mismo nombre'
        })
    }

    try {
        await registerRole(body)
        return {
            msg: 'Rol registrado'
        }
    } catch (error) {
        console.log(error)
    }
    
})