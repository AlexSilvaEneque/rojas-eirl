<script setup lang="ts">
    import { useStoreRole } from "@/stores/role"

    const storeRole = useStoreRole()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                storeRole.isOpenDelete = false
            }
        }
    })

    const handlerDelete = async () => {
        await storeRole.handlerDelete()
    }

</script>

<template>
    <UModal v-model="storeRole.isOpenDelete" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Eliminar Rol</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeRole.isOpenDelete = false"
                    />
                </div>
            </template>
            
            <div>
                <h3>¿Seguro de eliminar el rol?</h3>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerDelete">Aceptar</UButton>
                    <UButton color="red" @click="storeRole.isOpenDelete = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>