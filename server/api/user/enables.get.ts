import type { H3Event } from "h3"
import { getUsersEnable } from "~/server/controllers/user"
import { UserEnable } from "~/server/interfaces/user"

export default defineEventHandler(async (event : H3Event) => {
    const users : UserEnable[] = await getUsersEnable()
    return users
})