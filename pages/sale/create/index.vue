<script setup lang="ts">
    import { useStoreClient } from "~/stores/client"
    import { useStoreProduct } from "~/stores/product"
    import { useStoreCart } from "~/stores/cart"
    import { useGlobalUI } from "~/stores/globalUI"

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const { dataHead, dataProduct, detailProduct, disabledBtnAdd, disabledBtnSave, addCart, cancelSale, loadDataFormCreate, onSubmitCreate } = useSale()

    const storeClient = useStoreClient()
    const storeProduct = useStoreProduct()
    const storeCart = useStoreCart()
    const storeGlobalUI = useGlobalUI()

    onMounted(async () => {
        loadDataFormCreate()
    })
</script>

<template>
    <div class="w-full">
        <UIAlertSuccess v-if="storeGlobalUI.ToastSuccess.visible">
            {{ storeGlobalUI.ToastSuccess.message }}
        </UIAlertSuccess>
        
        <h1 class="font-extrabold text-2xl my-3">Registrar venta</h1>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-2">
            <div class="col-span-4 mb-2">
                <UFormGroup label="Fecha" name="date">
                    <UInput
                        type="date"
                        class="w-full"
                        v-model="dataHead.date"
                        color="indigo"
                        disabled
                    />
                </UFormGroup>
            </div>
            <div class="col-span-4 mb-2">
                <UFormGroup label="Vendedor" name="seller">
                    <UInput
                        class="w-full"
                        v-model="dataHead.seller"
                        color="indigo"
                        disabled
                    />
                </UFormGroup>
            </div>
            <div class="col-span-4 mb-2">
                <UFormGroup label="Cliente" name="seller">
                    <USelectMenu
                        class="w-full"
                        searchable
                        searchable-placeholder="Busca un cliente..."
                        placeholder="Selecciona un cliente"
                        :options="storeClient.clientsEnables"
                        value-attribute="name"
                        option-attribute="name"
                        v-model="dataHead.client"
                        color="indigo"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-4 mb-2">
                <UFormGroup label="Producto" name="userId">
                    <USelectMenu
                        class="w-full"
                        searchable
                        searchable-placeholder="Busca un producto ..."
                        placeholder="Selecciona un producto"
                        :options="storeProduct.productEnables"
                        value-attribute="name"
                        option-attribute="name"
                        v-model="dataProduct.product"
                        color="indigo"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-2 mb-2">
                <UFormGroup label="Precio" name="userId">
                    <UInput
                        class="w-full"
                        disabled
                        v-model="detailProduct[0].price_sale"
                        color="indigo"
                    >
                        <template #trailing>
                            <span class="text-gray-500 text-sm">PEN</span>
                        </template>
                    </UInput>
                </UFormGroup>
            </div>
            <div class="col-span-2 mb-2">
                <UFormGroup label="Stock actual" name="userId">
                    <UInput
                        class="w-full"
                        disabled
                        v-model="detailProduct[0].stock"
                        color="indigo"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-2 mb-2">
                <UFormGroup label="Cantidad solicitada" name="userId">
                    <UInput
                        class="w-full"
                        color="indigo"
                        v-model="dataProduct.qty"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-2 mb-2 flex items-end">
                <UButton
                    label="Añadir"
                    icon="i-heroicons-plus-circle"
                    block
                    color="teal"
                    :disabled="disabledBtnAdd"
                    @click="addCart"
                />
            </div>
        </div>

        <h3 class="my-2 font-semibold">Detalle de venta</h3>
        <div class="w-full flex justify-between items-center mb-3">
            <div class="flex gap-x-1">
                <UButton
                    label="Registrar venta"
                    color="indigo"
                    :disabled="disabledBtnSave"
                    @click="onSubmitCreate"
                />
                <UButton
                    label="Cancelar operación"
                    color="rose"
                    @click="cancelSale"
                />
            </div>
            <h4 class="font-semibold text-end">Total a pagar:
                <span class="ml-2 font-bold">{{ formatCurrency(storeCart.total) }}</span>
            </h4>
        </div>

        <OthersSaleSalesCart />
    </div>
</template>