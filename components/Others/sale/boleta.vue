<script setup lang="ts">
    import { useGlobalUI } from '~/stores/globalUI'

    const { isOpenBoleta, saveChangeBoleta } = useSale()
    const storeGloblalUI = useGlobalUI()

    interface Config  {
        id: string
        description: string
        value: number
    }

    const state = reactive({
        disabledModify: false,
        disabledSave: true
    })

    const data = reactive<Config>({
        id: '',
        description: '',
        value: 0
    })

    watchEffect(async () => {
        if (state.disabledModify) {
            state.disabledSave = false
            state.disabledModify = true
        } else {
            state.disabledSave = true
            state.disabledModify = false
        }

        if (!isOpenBoleta.value) {
            state.disabledModify = false
            state.disabledSave = true
        } else {
            const res = await $fetch('/api/config/list')
            data.id = res[0].id
            data.description = res[0].description
            data.value = res[0].value
        }
    })

</script>

<template>
    <UModal v-model="isOpenBoleta" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header class="overflow-y-scroll">
                <div class="flex justify-between items-center">
                    <h2>Configuración Boleta</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenBoleta = false"
                    />
                </div>
                <UIAlertMissingFields v-if="storeGloblalUI.ToastFailed.visible">
                    {{ storeGloblalUI.ToastFailed.message }}
                </UIAlertMissingFields>
            </template>
            
            <div class="space-y-3">
                <UFormGroup label="Nombre de parámetro">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese el nombre"
                        v-model="data.description"
                        disabled
                    />
                </UFormGroup>
                
                
                <UFormGroup label="N° Actual">
                    <UInput
                        color="indigo"
                        type="number"
                        placeholder="0"
                        v-model="data.value"
                        :disabled="state.disabledSave"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="emerald" :disabled="state.disabledModify" @click="state.disabledModify = true">Modificar</UButton>
                    <UButton class="mr-2" color="indigo" :disabled="state.disabledSave" @click="saveChangeBoleta(data.id, data.value)">Guardar cambios</UButton>
                    <UButton color="red" @click="isOpenBoleta = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>