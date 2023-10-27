<script setup lang="ts">
    import { useStoreClient } from "~/stores/client"

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                store.isOpenInfo = false
            }
        }
    })

    const store = useStoreClient()
</script>

<template>
    <UModal v-model="store.isOpenInfo" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Información del Cliente</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="store.isOpenInfo = false"
                    />
                </div>
            </template>
            
            <div class="grid grid-cols-1 gap-y-2 space-y-2" v-if="store.client">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Nombre:</h3>
                    <span>
                        {{ store.client?.name }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Tipo cliente:</h3>
                    <span>
                        {{ store.client!.type === 'CORPORATE' ? 'JURIDICO' : 'NATURAL' }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Correo:</h3>
                    <span>
                        {{ store.client?.email }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Dirección:</h3>
                    <span>
                        {{ store.client?.address }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Teléfono:</h3>
                    <span>
                        {{ store.client?.phone }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <UBadge size="xs"
                            :label="store.client?.status ? 'Activo' : 'Eliminado'"
                            :color="store.client?.status ? 'primary' : 'red'"
                        />
                    </span>
                </div>
            </div>

            <div v-else class="grid grid-cols-1 gap-y-2 space-y-2">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Nombre:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Tipo cliente:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Correo:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Dirección:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Teléfono:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
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