<script setup lang="ts">
    const { user, isOpenInfo } = useUsers()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                isOpenInfo.value = false
            }
        }
    })
</script>

<template>
    <UModal v-model="isOpenInfo" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Información del usuario</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenInfo = false"
                    />
                </div>
            </template>
            
            <div class="grid grid-cols-1 gap-y-2 space-y-2" v-if="user">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Nombre:</h3>
                    <span>
                        {{ user.name }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Telefono:</h3>
                    <span>
                        {{ user.phone }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Correo:</h3>
                    <span>
                        {{ user.email }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Dirección:</h3>
                    <span>
                        {{ user.address }}
                    </span>
                </div>
                <!-- <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <UBadge size="xs"
                            :label="store.role?.status ? 'Activo' : 'Eliminado'"
                            :color="store.role?.status ? 'primary' : 'red'"
                        />
                    </span>
                </div> -->
            </div>

            <div v-else class="grid grid-cols-1 gap-y-2 space-y-2">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Nombre:</h3>
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
                <!-- <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <USkeleton class="h-6 w-[50px]" />
                    </span>
                </div> -->
            </div>
        </UCard>
    </UModal>
</template>