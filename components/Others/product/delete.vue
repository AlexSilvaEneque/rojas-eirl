<script setup lang="ts">
    import { useStoreProduct } from "@/stores/product"

    const store = useStoreProduct()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                store.isOpenDelete = false
            }
        }
    })

    const handlerDelete = async () => {
        await store.handlerDelete()
    }

</script>

<template>
    <UModal v-model="store.isOpenDelete" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Eliminar producto</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="store.isOpenDelete = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de eliminar el producto?</h3>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerDelete">Aceptar</UButton>
                    <UButton color="red" @click="store.isOpenDelete = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>