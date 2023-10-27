import { Client, CreateClient } from "~/interface/client"
import { useGlobalUI } from "~/stores/globalUI"

export const useStoreClient = defineStore('client', () => {
    
    const storeGlobalUI = useGlobalUI()
    const clients = ref<Client[]>([])
    const client = ref<Client | null>()
    const q = ref<string>('')

    const isOpen = ref<boolean>(false)
    const isOpenInfo = ref<boolean>(false)
    const isOpenEdit = ref<boolean>(false)
    const isOpenDelete = ref<boolean>(false)
    const isOpenEnable = ref<boolean>(false)

    const filteredClients = computed(() => {
        if (!q.value) { return clients.value }

        return clients.value.filter(client => {
            return Object.values(client).some(value => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    const loadClients = async () => {
        const res : Client[] = await $fetch('/api/client/clients')
        clients.value = res
    }

    const selectedClient = async (param : Client) => {
        const res : Client | null = await $fetch('/api/client/'+param.id)
        client.value = res
    }

    const moreInfo = async (client : Client) => {
        isOpenInfo.value = true
        await selectedClient(client)
    }

    const handlerSubmitCreate = async (client : CreateClient) => {
        if (Object.keys(client).length < 2) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{ message: string }>('/api/client/register',{
                method: 'POST',
                body: {
                    ...client
                }
            })
            isOpen.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadClients()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const editItem = async (client : Client) => {
        await selectedClient(client)
        isOpenEdit.value = true
    }
    const handlerSubmitEdit = async (sendData : CreateClient) => {
        if (Object.keys(sendData).length < 2) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{message: string}>('/api/client/'+client.value?.id, {
                method: 'PUT',
                body: {
                    ...sendData
                }
            })
            isOpenEdit.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadClients()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const deleteItem = async (client : Client) => {
        await selectedClient(client)
        isOpenDelete.value = true
    }

    const handlerDelete = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/client/'+client.value?.id, {
                method: 'DELETE'
            })
            isOpenDelete.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadClients()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const enableItem = async (client : Client) => {
        await selectedClient(client)
        isOpenEnable.value = true
    }

    const handlerEnableItem = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/client/'+client.value?.id, {
                method: 'PATCH'
            })
            isOpenEnable.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadClients()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    watchEffect(() => {
        if (!isOpenInfo.value || !isOpenEdit.value || !isOpenDelete.value || !isOpenEnable.value) {
            client.value = null
        }
    })

    onMounted(async () => {
        loadClients()
    })

    return {
        clients,
        client,
        q,
        isOpen,
        isOpenInfo,
        isOpenEdit,
        isOpenDelete,
        isOpenEnable,
        filteredClients,
        selectedClient,
        moreInfo,
        handlerSubmitCreate,
        editItem,
        handlerSubmitEdit,
        deleteItem,
        handlerDelete,
        enableItem,
        handlerEnableItem
    }
})