import { CreateSale, SaleAll, SaleById } from "~/interface/sale"
import { Items, useStoreCart } from "~/stores/cart"
import { useStoreProduct } from "~/stores/product"
import { useStoreAuth } from "~/stores/auth"
import { useStoreClient } from "~/stores/client"
import { useGlobalUI } from "~/stores/globalUI"

export default function useSale () {

    const router = useRouter()
    const storeGlobalUI = useGlobalUI()
    const storeAuth = useStoreAuth()
    const storeClient = useStoreClient()
    const cart = useStoreCart()
    const storeProduct = useStoreProduct()

    const sales = useState<SaleAll[]>(() => [])
    const sale = useState<SaleById | null>(() => null)
    const q = useState<string>(() => '')
    const isOpen = useState<boolean>(() => false)
    const isOpenInfo = useState<boolean>(() => false)
    const isOpenDelete = useState<boolean>(() => false)
    const isOpenEnable = useState<boolean>(() => false)
    const flag = useState<boolean>(() => false)

    const dataHead = useState(() => ({
        date: getCurrentDate(),
        userId: '',
        seller: '',
        client: ''
    }))

    const dataProduct = useState(() => ({
        productId: '',
        product: '',
        qty: 0
    }))

    const detailProduct = computed(() => {
        if (!dataProduct.value.product) {
            return[
                { id: "", name: "", price_sale: 0, stock: 0 }
            ]
        } else {
            return storeProduct.productEnables.filter((item) => item.name === dataProduct.value.product)
        }
    })

    const selectedClient = computed(() => storeClient.clientsEnables.filter((client) => client.name === dataHead.value.client))

    const disabledBtnAdd = computed(() => dataProduct.value.product.length === 0 || dataProduct.value.qty <= 0)

    const disabledBtnSave = computed(() => cart.items.length <= 0 || dataHead.value.client === '')

    const addCart = () => {
        const item : Items = {
            productId: detailProduct.value[0].id,
            product: detailProduct.value[0].name,
            price: detailProduct.value[0].price_sale,
            quantity: dataProduct.value.qty,
            subtotal: detailProduct.value[0].price_sale * dataProduct.value.qty
        }
        cart.addItems(item)

        dataProduct.value.productId = ''
        dataProduct.value.product = ''
        dataProduct.value.qty = 0
    }

    const loadDataFormCreate = async () => {
        dataHead.value.userId = storeAuth.user.id
        dataHead.value.seller = storeAuth.user.name
        await storeClient.loadClientsEnable()
        await storeProduct.loadProductsEnables()
    }

    const filteredSales = computed(() => {
        if (!q.value) { return sales.value }

        return sales.value.filter(sale => {
            return Object.values(sale).some(value => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    const loadSales = async () => {
        const res: SaleAll[] = await $fetch('/api/sale/sales')
        sales.value = res
    }

    const selectedSale = async (id: string) => {
        const res : SaleById | null = await $fetch('/api/sale/'+ id)
        sale.value = res
    }

    const moreInfo = async (param: SaleAll) => {
        isOpenInfo.value = true
        await selectedSale(param.id)
    }

    const cancelSale = () => {
        navigateTo('/sale')
        cart.$reset()
    }

    const onSubmitCreate = async () => {
        const sendData : CreateSale = {
            userId: dataHead.value.userId,
            clientId: selectedClient.value[0].id,
            total: cart.total,
            detail: cart.items
        }
        try {
            const res = await $fetch<{ message: string, id: string }>('/api/sale/register', {
                method: 'POST',
                body: {
                    ...sendData
                }
            })
            storeGlobalUI.showMsgSuccess(res.message)
            cart.$reset()
            navigateTo('/sale/pay/'+res.id)
            await storeProduct.loadProducts()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const paySaleForm = async (param: SaleAll) => {
        console.log(param)
        sale.value = null
        navigateTo('/sale/pay/'+param.id)
    }

    const registerPay = async (totalSale: number, recive: number) => {
        let stateSale = 0
        let valueTotal = 0
        
        // primer pago
        if (totalSale > Number(recive)) {
            stateSale = 1
            valueTotal = Number(recive)
        }

        if (totalSale <= Number(recive)) {
            stateSale = 2
            valueTotal = totalSale
        }

        // segundo pago, obliga a que solo sean 2 pagos
        if (sale.value?.paid !== 0) {
            stateSale = 2
            valueTotal = totalSale
        }

        try {
            const res = await $fetch<{ message: string }>('/api/sale/'+sale.value?.id!, {
                method: 'PATCH',
                body: {
                    paid: valueTotal,
                    state: stateSale
                }
            })
            storeGlobalUI.showMsgSuccess(res.message)
            navigateTo('/sale')
            // flag.value = true
            // navigateTo('/sale/pay/'+sale.value?.id!)
            
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    const deleteItem = async (param: SaleAll) => {
        isOpenDelete.value = true
        await selectedSale(param.id)
    }

    const handlerDelete = async () => {
        try {
            const res = await $fetch<{ message: string }>('/api/sale/'+sale.value!.id, {
                method: 'DELETE'
            })
            isOpenDelete.value = false
            storeGlobalUI.showMsgSuccess(res.message)
            loadSales()
        } catch (error:any) {
            storeGlobalUI.showMsgFailed(error.statusMessage)
        }
    }

    watch([isOpen, isOpenInfo, isOpenDelete, isOpenEnable], () => {
        if (!isOpen.value || !isOpenInfo.value || !isOpenDelete.value || !isOpenEnable.value) {
            sale.value = null
        }
    })

    onMounted(() => {
        loadSales()
    })

    return {
        sales,
        sale,
        q,
        flag,
        isOpen,
        isOpenInfo,
        isOpenDelete,
        isOpenEnable,
        dataHead,
        dataProduct,
        detailProduct,
        disabledBtnAdd,
        disabledBtnSave,
        selectedSale,
        addCart,
        filteredSales,
        loadSales,
        moreInfo,
        cancelSale,
        loadDataFormCreate,
        onSubmitCreate,
        paySaleForm,
        registerPay,
        deleteItem,
        handlerDelete
    }
}