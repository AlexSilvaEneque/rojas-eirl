<script setup lang="ts">

    const { isOpenDelete, handlerDeleteItem } = useUsers()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                isOpenDelete.value = false
            }
        }
    })

    const handlerDelete = async () => {
        await handlerDeleteItem()
    }

</script>

<template>
    <UModal v-model="isOpenDelete" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Eliminar usuario</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenDelete = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de eliminar este usuario?</h3>
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