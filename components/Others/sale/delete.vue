<script setup lang="ts">

    const { isOpenDelete, handlerDelete } = useSale()
    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                isOpenDelete.value = false
            }
        }
    })


</script>

<template>
    <UModal v-model="isOpenDelete" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Dar de baja venta</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenDelete = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de dar de baja esta venta?</h3>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerDelete">Aceptar</UButton>
                    <UButton color="red" @click="isOpenDelete = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>