import { register, userByEmail } from "~/server/controllers/user"
import { CreateUser } from "~/server/interfaces/user"
import bcrypt  from "bcrypt"

export default defineEventHandler(async (event) => {
    const body : CreateUser = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Los campos son obligatorios'
        })
    }

    if (!body.email || !body.password || !body.name || !body.roleId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Los campos son obligatorios'
        })
    }

    const usarioExiste = await userByEmail(body.email)
    if (usarioExiste) {
        throw createError({
            statusCode: 400,
            statusMessage: 'El email está ya en uso'
        })
    }

    const MIN_PASSWORD_LENGTH = 6
    if (body.password.trim().length < MIN_PASSWORD_LENGTH) {
        throw createError({
            statusCode: 400,
            statusMessage: `La contraseña debe tener mínino ${MIN_PASSWORD_LENGTH} caracteres.`
        })
    }

    let hash = await bcrypt.hash(body.password, 10)
    
    body.password = hash

    try {
        await register(body)
        return {
            message: 'Usuario registrado'
        }
    } catch (error) {
        console.log(error)   
    }
})