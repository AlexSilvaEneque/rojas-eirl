import { User } from "~/server/interfaces/user"


export const useStoreAuth = defineStore('auth', () => {
    const user = ref<User>({
        id: '',
        name: '',
        email: '',
        password: '',
        roleId: ''
    })

    return {
        user
    }
})