<script setup lang="ts">
    const { isOpenEnable, handlerEnableItem } = useUsers()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                isOpenEnable.value = false
            }
        }
    })

    const handlerDelete = async () => {
        await handlerEnableItem()
    }

</script>

<template>
    <UModal v-model="isOpenEnable" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Habilitar usuario</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenEnable = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de habilitar este usuario?</h3>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerDelete">Aceptar</UButton>
                    <UButton color="red" @click="isOpenEnable = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>