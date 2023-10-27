<script setup lang="ts">
    import { useStoreProduct } from '~/stores/product';
    import { useGlobalUI } from '~/stores/globalUI'
    import { CreateProduct } from '~/interface/product';
    import { useStoreCategory } from '~/stores/category';

    const storeProduct = useStoreProduct()
    const storeCategory = useStoreCategory()
    const storeGloblalUI = useGlobalUI()

    const data = reactive<CreateProduct>({
        name: '',
        categoryId: '',
        category: '',
        price_purchase: 0,
        price_sale: 0,
        stock: 0
    })

    const categorySelected = computed(() => storeCategory.categoriesEnable.find(category => category.name === data.category))

    const handlerSubmit = async () => {
        data.categoryId = categorySelected.value?.id!
        await storeProduct.handlerSubmitCreate(data)
    }

    watchEffect(async () => {
        if (!storeProduct.isOpen) {
            data.name = ''
            data.categoryId = ''
            data.category = ''
            data.price_purchase = 0
            data.price_sale = 0
            data.stock = 0
        } else {
            await storeCategory.loadCategoriesEnable()
        }
    })
</script>

<template>
    <UModal v-model="storeProduct.isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header class="overflow-y-scroll">
                <div class="flex justify-between items-center">
                    <h2>Registrar Producto</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeProduct.isOpen = false"
                    />
                </div>
                <UIAlertMissingFields v-if="storeGloblalUI.ToastFailed.visible">
                    {{ storeGloblalUI.ToastFailed.message }}
                </UIAlertMissingFields>
            </template>
            
            <div class="space-y-3">
                <UFormGroup label="Nombre">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese el nombre"
                        v-model="data.name"
                    />
                </UFormGroup>
                <UFormGroup label="Categoría">
                    <USelectMenu
                        searchable
                        color="indigo"
                        searchable-placeholder="Busca una categoría"
                        class="w-full"
                        placeholder="Selecciona una categoría"
                        :options="storeCategory.categories"
                        value-attribute="name"
                        option-attribute="name"
                        v-model="data.category"
                    />
                </UFormGroup>
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
                <UFormGroup label="Stock">
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
                    <UButton color="red" @click="storeProduct.isOpen = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>