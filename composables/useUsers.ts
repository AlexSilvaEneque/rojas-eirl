import { useGlobalUI } from "~/stores/globalUI"
import { UserAll, User, CreateUser } from "~/interface/user"

export default function useUsers () {
    const storeGlobalUI = useGlobalUI()

    const users = useState<UserAll[]>(() => [])
    const user = useState<User | null>(() => null)
    const q = useState<string>(() => '')
    const isOpen = useState<boolean>(() => false)
    const isOpenInfo = useState<boolean>(() => false)
    const isOpenEdit = useState<boolean>(() => false)
    const isOpenDelete = useState<boolean>(() => false)
    const isOpenEnable = useState<boolean>(() => false)

    const filteredUsers = computed(() => {
        if (!q.value) { return users.value }

        return users.value.filter(user => {
            return Object.values(user).some(value => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    const loadUsers = async () => {
        const res: UserAll[] = await $fetch('/api/user/user')
        users.value = res
    }

    const usersEnable = async () => {
        const res = await $fetch('/api/user/enables')
        console.log(res)
    }

    const selectedUser = async (param: User) => {
        const res: User | null = await $fetch('/api/auth/'+param.id)
        
        user.value = res
    }

    const moreInfo = async (param: User) => {
        isOpenInfo.value = true
        await selectedUser(param)
    }

    const handlerSubmitCreate = async (formData: CreateUser) => {
        if (!formData.name || !formData.email || !formData.password || !formData.roleId) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{ message: string }>('/api/auth/register', {
                method: 'POST',
                body: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    password: formData.password,
                    roleId: formData.roleId
                }
            })
            isOpen.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadUsers()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const editItem = async (param: User) => {
        isOpenEdit.value = true
        await selectedUser(param)
    }

    const handlerSubmitEdit = async (formData: CreateUser) => {
        if (!formData.name || !formData.email || !formData.roleId) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{ message: string }>('/api/user/'+user.value?.id, {
                method: 'PUT',
                body: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    password: formData.password,
                    roleId: formData.roleId
                }
            })
            isOpenEdit.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadUsers()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const deleteItem = async (user: User) => {
        isOpenDelete.value = true
        await selectedUser(user)
    }

    const handlerDeleteItem = async () => {
        try {
            const res = await $fetch<{message: string}>('/api/user/'+user.value?.id, {
                method: 'DELETE'
            })
            isOpenDelete.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadUsers()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const enableItem = async (user: User) => {
        isOpenEnable.value = true
        await selectedUser(user)
    }

    const handlerEnableItem = async () => {
        try {
            const res = await $fetch<{message: string}>('/api/user/'+user.value?.id, {
                method: 'PATCH'
            })
            isOpenEnable.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadUsers()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    watch([isOpen, isOpenInfo, isOpenEdit, isOpenDelete, isOpenEnable], () => {
        if (!isOpen.value || !isOpenInfo.value || !isOpenEdit.value || !isOpenDelete.value || !isOpenEnable.value) {
            user.value = null
        }
    })

    onMounted(() => {
        loadUsers()
    })

    return {
        users,
        user,
        q,
        isOpen,
        isOpenInfo,
        isOpenEdit,
        isOpenDelete,
        isOpenEnable,
        filteredUsers,
        loadUsers,
        selectedUser,
        usersEnable,
        moreInfo,
        handlerSubmitCreate,
        editItem,
        handlerSubmitEdit,
        deleteItem,
        handlerDeleteItem,
        enableItem,
        handlerEnableItem
    }
}