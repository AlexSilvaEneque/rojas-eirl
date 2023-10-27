<script setup lang="ts">
    import { useStoreCategory } from '~/stores/category'
    import { useGlobalUI } from '~/stores/globalUI'

    const storeCategory = useStoreCategory()
    const storeGloblalUI = useGlobalUI()

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                storeCategory.isOpen = false
            }
        }
    })

    const name = ref<string>('')

    const handlerSubmit = async () => {
        await storeCategory.handlerSubmitCreate(name.value)
    }

    watch(() => storeCategory.isOpen ,()=> {
        if (!storeCategory.isOpen) {
            name.value = ''
        }
    })
</script>

<template>
    <UModal v-model="storeCategory.isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Registrar Categoría</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeCategory.isOpen = false"
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
                        v-model="name"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar</UButton>
                    <UButton color="red" @click="storeCategory.isOpen = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>