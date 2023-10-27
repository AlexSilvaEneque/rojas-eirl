import { useStoreAuth } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useStoreAuth()

    if (process.client) {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const data = await $fetch('/api/auth/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            store.user = data

            if (Object.keys(store.user).length === 0) {
                return navigateTo('/')
            } else {
                return
            }
            
        } catch (error) {
            return navigateTo('/')
        }
    }
})