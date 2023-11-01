import { CreateProduct, Product } from "~/interface/product"
import { useGlobalUI } from "~/stores/globalUI"

export const useStoreProduct = defineStore('product', () => {

    const storeGlobalUI = useGlobalUI()
    const products = ref<Product[]>([])
    const product = ref<Product | null>()
    const q = ref<string>('')

    const isOpen = ref<boolean>(false)
    const isOpenInfo = ref<boolean>(false)
    const isOpenEdit = ref<boolean>(false)
    const isOpenDelete = ref<boolean>(false)
    const isOpenEnable = ref<boolean>(false)
    const isOpenNewEntry = ref<boolean>(false)

    const filteredProducts = computed(() => {
        if (!q.value) { return products.value }

        return products.value.filter(product => {
            return Object.values(product).some(value => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    const loadProducts = async () => {
        const res : Product[] = await $fetch('/api/product/products')
        products.value = res
    }

    const selectedProduct = async (param : Product) => {
        const res : Product | null = await $fetch('/api/product/'+param.id)
        product.value = res
    }

    const moreInfo = async (product : Product) => {
        isOpenInfo.value = true
        await selectedProduct(product)
    }

    const newEntry = async (product: Product) => {
        isOpenNewEntry.value = true
        await selectedProduct(product)
    }

    const handlerSubmitNewEntry = async (sendData : CreateProduct) => {
        if (Object.keys(sendData).length < 3) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{message: string}>('/api/product/new/'+product.value?.id, {
                method: 'PUT',
                body: {
                    name: sendData.name,
                    stock: Number(sendData.stock),
                    price_sale: Number(sendData.price_sale),
                    price_purchase: Number(sendData.price_purchase),
                    categoryId: sendData.categoryId
                }
            })
            console.log(res.message)
            isOpenNewEntry.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadProducts()
        } catch (error:any) {
            console.log(error)
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const handlerSubmitCreate = async (product : CreateProduct) => {
        if (Object.keys(product).length < 5 || Object.values(product).includes('')) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{ message: string }>('/api/product/register', {
                method: 'POST',
                body: {
                    name: product.name,
                    stock: Number(product.stock),
                    price_sale: Number(product.price_sale),
                    price_purchase: Number(product.price_purchase),
                    categoryId: product.categoryId
                }
            })
            isOpen.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadProducts()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const editItem = async (product : Product) => {
        await selectedProduct(product)
        isOpenEdit.value = true
    }

    const handlerSubmitEdit = async (sendData : CreateProduct) => {
        if (Object.keys(sendData).length < 5) {
            storeGlobalUI.showMsgFailed('Complete los campos obligatorios')
            return
        }
        try {
            const res = await $fetch<{message: string}>('/api/product/'+product.value?.id, {
                method: 'PUT',
                body: {
                    name: sendData.name,
                    stock: Number(sendData.stock),
                    price_sale: Number(sendData.price_sale),
                    price_purchase: Number(sendData.price_purchase),
                    categoryId: sendData.categoryId
                }
            })
            isOpenEdit.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadProducts()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const deleteItem = async (product : Product) => {
        await selectedProduct(product)
        isOpenDelete.value = true
    }

    const handlerDelete = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/product/'+product.value?.id, {
                method: 'DELETE'
            })
            isOpenDelete.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadProducts()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const enableItem = async (product : Product) => {
        await selectedProduct(product)
        isOpenEnable.value = true
    }

    const handlerEnableItem = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/product/'+product.value?.id, {
                method: 'PATCH'
            })
            isOpenEnable.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadProducts()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    watchEffect(() => {
        if (!isOpenInfo.value || !isOpenEdit.value || !isOpenDelete.value || !isOpenEnable.value) {
            product.value = null
        }
    })

    onMounted(() => {
        loadProducts()
    })

    return {
        products,
        product,
        q,
        isOpen,
        isOpenInfo,
        isOpenEdit,
        isOpenDelete,
        isOpenEnable,
        isOpenNewEntry,
        filteredProducts,
        moreInfo,
        newEntry,
        handlerSubmitNewEntry,
        handlerSubmitCreate,
        editItem,
        handlerSubmitEdit,
        deleteItem,
        handlerDelete,
        enableItem,
        handlerEnableItem
    }
})