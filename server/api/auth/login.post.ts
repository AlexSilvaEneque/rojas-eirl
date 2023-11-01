import { compare } from "bcrypt"
import { userByEmail } from "~/server/controllers/user"
import { Login } from "~/server/interfaces/auth"
import { generateJWT } from "~/server/utils"

export default defineEventHandler(async (event) => {
    
    const body : Login = await readBody(event)
    
    const { email, password } = body
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Los campos son obligatorios'
        })
    }
    
    const user = await userByEmail(email)
    
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'El usuario no existe'
        })
    }

    if (await compare(password, user.password!)) {
        const token = generateJWT(user.id)
        return { token }
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: 'La contraseña es incorrecta'
        })
    }
})