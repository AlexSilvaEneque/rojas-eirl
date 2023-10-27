import { userById } from "~/server/controllers/user"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()

    if (!event.node.req.headers.authorization) {
        throw createError({
            statusCode: 403,
            statusMessage: 'No hay token'
        })
    }

    try {
        const token = event.node.req.headers?.authorization?.split(' ')[1]
        const decoded : any = jwt.verify(token, config.jwt_secret as string)
        event.context.user = await userById(decoded.id)
        const user = event.context.user
        return user
    } catch (error) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Token no válido'
        })
    }
})