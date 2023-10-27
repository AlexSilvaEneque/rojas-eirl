<script setup lang="ts">
    import { useStoreRole } from "~/stores/role"

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                store.isOpenInfo = false
            }
        }
    })

    const store = useStoreRole()
</script>

<template>
    <UModal v-model="store.isOpenInfo" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Información del Rol</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="store.isOpenInfo = false"
                    />
                </div>
            </template>
            
            <div class="grid grid-cols-2 gap-y-2" v-if="Object.values(store.role!).length > 0">
                <h3 class="font-medium">Rol:</h3>
                <span>
                    {{ store.role?.description }}
                </span>
                <h3 class="font-medium">Estado:</h3>
                <span>
                    <UBadge size="xs"
                        :label="store.role?.status ? 'Activo' : 'Eliminado'"
                        :color="store.role?.status ? 'primary' : 'red'"
                    />
                </span>
            </div>

            <div v-else class="grid grid-cols-2 gap-y-2">
                <h3 class="font-medium">Rol:</h3>
                <span>
                    <USkeleton />
                </span>
                <h3 class="font-medium">Estado:</h3>
                <span>
                    <USkeleton />
                </span>
            </div>
        </UCard>
    </UModal>
</template>