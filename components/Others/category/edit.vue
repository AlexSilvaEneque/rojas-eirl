<script setup lang="ts">
    import { useStoreCategory } from '~/stores/category'
    import { useGlobalUI } from '~/stores/globalUI'

    const store = useStoreCategory()
    const globalUI = useGlobalUI()
    const name = ref<string>('')

    defineShortcuts({
        escape: {
            usingInput: true,
            handler: () => {
                store.isOpenEdit = false
            }
        }
    })

    const handlerSubmit = async () => {
        await store.handlerSubmitEdit(name.value)
    }

    watch(() => store.isOpenEdit, () => {
        if (store.isOpenEdit) {
            name.value = store.category?.name!
        }
    })
</script>

<template>
    <UModal v-model="store.isOpenEdit" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Editar Categoria</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="store.isOpenEdit = false"
                    />
                </div>
                <UIAlertMissingFields v-if="globalUI.ToastFailed.visible">
                    {{ globalUI.ToastFailed.message }}
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
                    <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar cambios</UButton>
                    <UButton color="red" @click="store.isOpenEdit = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>