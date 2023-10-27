import { IUser } from "~/server/interfaces"

export const useStoreAuth = defineStore('auth', () => {
    const user = ref<IUser>({
        name: '',
        email: '',
        password: '',
        roleId: ''
    })

    return {
        user
    }
})