<script setup lang="ts">
    import { useStoreCategory } from "~/stores/category"

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                store.isOpenInfo = false
            }
        }
    })

    const store = useStoreCategory()
</script>

<template>
    <UModal v-model="store.isOpenInfo" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Información de la Categoría</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="store.isOpenInfo = false"
                    />
                </div>
            </template>
            
            <div class="grid grid-cols-1 gap-y-2 space-y-2" v-if="store.category">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Nombre:</h3>
                    <span>
                        {{ store.category?.name }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <UBadge size="xs"
                            :label="store.category?.status ? 'Activo' : 'Eliminado'"
                            :color="store.category?.status ? 'primary' : 'red'"
                        />
                    </span>
                </div>
            </div>

            <div v-else class="grid grid-cols-2 gap-y-2 space-y-2">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Nombre:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]"/>
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <USkeleton class="h-6 w-[50px]" />
                    </span>
                </div>
            </div>
        </UCard>
    </UModal>
</template>