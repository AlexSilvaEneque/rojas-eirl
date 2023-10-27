<script setup lang="ts">
    import { useStoreRole } from '~/stores/role'
    import { useGlobalUI } from '~/stores/globalUI'

    const storeRole = useStoreRole()
    const storeGloblalUI = useGlobalUI()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                storeRole.isOpen = false
            }
        }
    })

    const description = ref<string>('')

    const handlerSubmit = async () => {
        await storeRole.handlerSubmitCreate(description.value)
    }

    watch(() => storeRole.isOpen ,()=> {
        if (!storeRole.isOpen) {
            description.value = ''
        }
    })
</script>

<template>
    <UModal v-model="storeRole.isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Registrar Rol</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeRole.isOpen = false"
                    />
                </div>
                <UIAlertMissingFields v-if="storeGloblalUI.ToastFailed.visible">
                    {{ storeGloblalUI.ToastFailed.message }}
                </UIAlertMissingFields>
            </template>
            
            <div>
                <UFormGroup label="Descripcion">
                    <UInput
                        color="indigo"
                        v-model="description"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar</UButton>
                    <UButton color="red" @click="storeRole.isOpen = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>