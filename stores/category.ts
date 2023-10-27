import { Category } from "~/interface/category"
import { useGlobalUI } from "~/stores/globalUI"

export const useStoreCategory = defineStore('category', () => {

    const storeGlobalUI = useGlobalUI()
    const categories = ref<Category[]>([])
    const categoriesEnable = ref<Category[]>([])
    const category = ref<Category | null>()
    const q = ref<string>('')

    const isOpen = ref<boolean>(false)
    const isOpenInfo = ref<boolean>(false)
    const isOpenEdit = ref<boolean>(false)
    const isOpenDelete = ref<boolean>(false)
    const isOpenEnable = ref<boolean>(false)

    const filteredCategories = computed(() => {
        if (!q.value) { return categories.value }

        return categories.value.filter(category => {
            return Object.values(category).some(value => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    const loadCategoriesEnable = async () => {
        const res : Category[] = await $fetch('/api/category/enables')
        categoriesEnable.value = res
    }

    const loadCategories = async () => {
        const res : Category[] = await $fetch('/api/category/categories')
        categories.value = res
    }

    const selectedCategory = async (param : Category) => {
        const res : Category | null = await $fetch('/api/category/'+param.id)
        category.value = res
    }

    const moreInfo = async (category : Category) => {
        isOpenInfo.value = true
        await selectedCategory(category)
    }

    const handlerSubmitCreate = async (name : string) => {
        if (!name) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{ message: string }>('/api/category/register', {
                method: 'POST',
                body: {
                    name
                }
            })
            isOpen.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadCategories()
        } catch (error:any) {
            console.log(error)
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const editItem = async (category : Category) => {
        await selectedCategory(category)
        isOpenEdit.value = true
    }

    const handlerSubmitEdit = async (name : string) => {
        if (!name) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{message: string}>('/api/category/'+category.value?.id, {
                method: 'PUT',
                body: {
                    name
                }
            })
            isOpenEdit.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadCategories()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const deleteItem = async (category : Category) => {
        await selectedCategory(category)
        isOpenDelete.value = true
    }

    const handlerDelete = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/category/'+category.value?.id, {
                method: 'DELETE'
            })
            isOpenDelete.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadCategories()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const enableItem = async (category : Category) => {
        await selectedCategory(category)
        isOpenEnable.value = true
    }

    const handlerEnableItem = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/category/'+category.value?.id, {
                method: 'PATCH'
            })
            isOpenEnable.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadCategories()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    watchEffect(() => {
        if (!isOpenInfo.value || !isOpenEdit.value || !isOpenDelete.value || !isOpenEnable.value) {
            category.value = null
        }
    })

    onMounted(() => {
        loadCategories()
    })

    return {
        categories,
        categoriesEnable,
        category,
        q,
        isOpen,
        isOpenInfo,
        isOpenEdit,
        isOpenDelete,
        isOpenEnable,
        filteredCategories,
        selectedCategory,
        moreInfo,
        handlerSubmitCreate,
        editItem,
        handlerSubmitEdit,
        deleteItem,
        handlerDelete,
        enableItem,
        handlerEnableItem,
        loadCategoriesEnable
    }
})