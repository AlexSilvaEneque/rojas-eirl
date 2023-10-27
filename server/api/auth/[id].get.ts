import { userById } from "~/server/controllers/user"

export default defineEventHandler(async (event) => {
    const id = event.context.params!.id
    
    const user = await userById(id)

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'El usuario no existe'
        })
    }

    return user
})