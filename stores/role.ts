import { Role } from "~/interface/roles"
import { useGlobalUI } from "~/stores/globalUI"

export const useStoreRole = defineStore('role', () => {

    const storeGloblalUI = useGlobalUI()

    const roles = ref<Role[]>([])
    const role = ref<Role | null>()
    const q = ref<string>('')

    const isOpen = ref<boolean>(false)
    const isOpenInfo = ref<boolean>(false)
    const isOpenEdit = ref<boolean>(false)
    const isOpenDelete = ref<boolean>(false)
    const isOpenEnable = ref<boolean>(false)

    const filteredRoles = computed(() => {
        if (!q.value) {return roles.value}

        return roles.value.filter(rol => {
            return Object.values(rol).some(value => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    const selectedRole = async (rol: Role) => {
        const res = await $fetch<Role>('/api/role/'+rol.id, { method: 'GET' })
        role.value = res
    }

    const loadRoles = async () => {
        const res = await $fetch('/api/role/role', { method: 'GET' })
        roles.value = res
    }

    const moreInfo = async (rol : Role) => {
        await selectedRole(rol)
        isOpenInfo.value = true
    }

    const handlerSubmitCreate = async (description: string) => {
        if (!description) {
            storeGloblalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            let res = await $fetch('/api/role/register', {
                method: 'POST',
                body: {
                    description
                }
            })
            isOpen.value = false
            storeGloblalUI.showMsgSuccess(res.msg)
            loadRoles()
        } catch (error:any) {
            storeGloblalUI.showMsgFailed(error.statusMessage)
        }
    }

    const editItem = async (rol : Role) => {
        await selectedRole(rol)
        isOpenEdit.value = true
    }

    const handlerSubmitEdit = async (description: string) => {
        if (!description) {
            storeGloblalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }

        try {
            let res = await $fetch<{statusMessage:string}>('/api/role/'+role.value?.id, {
                method: 'put',
                body: {
                    description
                }
            })
            isOpenEdit.value = false
            storeGloblalUI.showMsgSuccess(res.statusMessage)
            loadRoles()
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteItem = async (row : Role) => {
        await selectedRole(row)
        isOpenDelete.value = true
    }

    const handlerDelete = async () => {
        try {
            let res = await $fetch<{ statusMessage: string }>('/api/role/'+role.value?.id, {
                method: 'delete'
            })
            isOpenDelete.value = false
            storeGloblalUI.showMsgSuccess(res.statusMessage)
        } catch (error) {
            
        }
    }

    const enableItem = async (row : Role) => {
        await selectedRole(row)
        isOpenEnable.value = true
    }

    const handlerEnableItem = async () => {
        try {
            let res = await $fetch<{ msg: string }>('/api/role/'+role.value?.id, { method: 'PATCH' })
            isOpenEnable.value = false
            storeGloblalUI.showMsgSuccess(res.msg)
        } catch (error) {
            console.log(error)
        }
    }

    const $reset = async () => {
        role.value = null
    }

    onMounted(async () => {
        await loadRoles()
    })

    return {
        filteredRoles,
        q,
        isOpen,
        isOpenInfo,
        isOpenEdit,
        isOpenDelete,
        isOpenEnable,
        role,
        roles,
        selectedRole,
        loadRoles,
        moreInfo,
        editItem,
        deleteItem,
        enableItem,
        handlerSubmitCreate,
        handlerSubmitEdit,
        handlerDelete,
        handlerEnableItem,
        $reset
    }
})