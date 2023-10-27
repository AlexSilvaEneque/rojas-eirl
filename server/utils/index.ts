import jwt from 'jsonwebtoken'

export const generateJWT = (id : string) => {
    const config = useRuntimeConfig()
    const token = jwt.sign({id}, config.jwt_secret, {expiresIn: '1d'})
    return token
}

export const isValidObjectId = (id: string) : Boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id)
}