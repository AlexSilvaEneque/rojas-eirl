import { allRoles } from "~/server/controllers/role"

export default defineEventHandler(async (event) => {
    
    const roles = await allRoles()
    return roles
})