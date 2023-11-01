<script setup lang="ts">
    import { useStoreProduct } from "@/stores/product"
    import { useGlobalUI } from "@/stores/globalUI"
    import { CreateProduct } from "~/interface/product";

    const storeGloblalUI = useGlobalUI()
    const storeProduct = useStoreProduct()

    const data = reactive<CreateProduct>({
        id: '',
        name: '',
        categoryId: '',
        category: '',
        price_purchase: 0,
        price_sale: 0,
        stock: 0
    })

    const handlerSubmit = async () => {
        await storeProduct.handlerSubmitNewEntry(data)
    }

    watchEffect(() => {
        if (storeProduct.isOpenNewEntry) {
            data.name = storeProduct.product?.name!
            data.categoryId = storeProduct.product?.categoryId!,
            data.category = storeProduct.product?.category?.name!,
            data.price_purchase = storeProduct.product?.price_purchase!,
            data.price_sale = storeProduct.product?.price_sale!,
            data.stock = 0
        }
    })
</script>

<template>
    <UModal v-model="storeProduct.isOpenNewEntry" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header class="overflow-y-scroll">
                <div class="flex justify-between items-center">
                    <h2>Nueva entrada de: {{ data.name }}</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeProduct.isOpenNewEntry = false"
                    />
                </div>
                <UIAlertMissingFields v-if="storeGloblalUI.ToastFailed.visible">
                    {{ storeGloblalUI.ToastFailed.message }}
                </UIAlertMissingFields>
            </template>
            
            <div class="space-y-3">
                <div class="grid grid-cols-2 gap-x-2">
                    <UFormGroup label="Precio de compra">
                        <UInput
                            color="indigo"
                            placeholder="00.00"
                            v-model="data.price_purchase"
                            @keypress="verifyValueMoney"
                        >
                            <template #trailing>
                                <span class="text-xs">PEN</span>
                            </template>
                        </UInput>
                    </UFormGroup>
                    <UFormGroup label="Precio de venta">
                        <UInput
                            color="indigo"
                            placeholder="00.00"
                            v-model="data.price_sale"
                            @keypress="verifyValueMoney"
                        >
                            <template #trailing>
                                <span class="text-xs">PEN</span>
                            </template>
                        </UInput>
                    </UFormGroup>
                </div>
                <UFormGroup label="Cantidad de ingreso">
                    <UInput
                        color="indigo"
                        type="number"
                        placeholder="0"
                        v-model="data.stock"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar</UButton>
                    <UButton color="red" @click="storeProduct.isOpenNewEntry = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>