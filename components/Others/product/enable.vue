<script setup lang="ts">
    import { useStoreProduct } from "@/stores/product"

    const store = useStoreProduct()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                store.isOpenEnable = false
            }
        }
    })

    const handlerEnable = async () => {
        await store.handlerEnableItem()
    }

</script>

<template>
    <UModal v-model="store.isOpenEnable" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Haibilitar producto</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="store.isOpenEnable = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de habilitar el producto?</h3>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerEnable">Aceptar</UButton>
                    <UButton color="red" @click="store.isOpenEnable = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>