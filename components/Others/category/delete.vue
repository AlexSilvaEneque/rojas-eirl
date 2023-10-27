<script setup lang="ts">
    import { useStoreCategory } from "@/stores/category"

    const storeCategory = useStoreCategory()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                storeCategory.isOpenDelete = false
            }
        }
    })

    const handlerDelete = async () => {
        await storeCategory.handlerDelete()
    }

</script>

<template>
    <UModal v-model="storeCategory.isOpenDelete" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Eliminar Categoría</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeCategory.isOpenDelete = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de eliminar la categoría?</h3>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerDelete">Aceptar</UButton>
                    <UButton color="red" @click="storeCategory.isOpenDelete = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>