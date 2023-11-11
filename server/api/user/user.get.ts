import { allUser } from "~/server/controllers/user"

export default defineEventHandler(async (event) => {
    const users = await allUser()
    return users
})