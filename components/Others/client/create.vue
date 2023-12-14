<script setup lang="ts">
    import { useStoreClient } from '~/stores/client';
    import { useGlobalUI } from '~/stores/globalUI'
    import { CreateClient } from '~/interface/client';

    const storeClient = useStoreClient()
    const storeGloblalUI = useGlobalUI()
    const { isOpen } = useSale()

    const data = reactive<CreateClient>({
        name: '',
        email: '',
        address: '',
        phone: '',
        type: 'INDIVIDUAL',
        desType: 'NATURAL'
    })

    const typeSelected = computed(() => data.desType === 'JURIDICO' ? 'CORPORATE' : 'INDIVIDUAL')

    const handlerSubmit = async () => {
        data.type = typeSelected.value
        await storeClient.handlerSubmitCreate(data)
        isOpen.value = false
    }

    watchEffect(async () => {
        if (!storeClient.isOpen) {
            data.name = ''
            data.email = ''
            data.address = ''
            data.phone = ''
            data.type = 'INDIVIDUAL'
            data.desType = 'NATURAL'
        }
    })
</script>

<template>
    <UModal v-model="storeClient.isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header class="overflow-y-scroll">
                <div class="flex justify-between items-center">
                    <h2>Registrar Cliente</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="storeClient.isOpen = false"
                    />
                </div>
                <UIAlertMissingFields v-if="storeGloblalUI.ToastFailed.visible">
                    {{ storeGloblalUI.ToastFailed.message }}
                </UIAlertMissingFields>
            </template>
            
            <div class="space-y-3">
                <UFormGroup label="Nombre">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese el nombre"
                        v-model="data.name"
                    />
                </UFormGroup>
                <UFormGroup label="Tipo Cliente">
                    <USelectMenu
                        searchable
                        color="indigo"
                        searchable-placeholder="Busca una categoría"
                        class="w-full"
                        placeholder="Selecciona una categoría"
                        :options="['NATURAL', 'JURIDICO']"
                        v-model="data.desType"
                    />
                </UFormGroup>
                <UFormGroup label="Email">
                    <UInput
                        type="email"
                        color="indigo"
                        placeholder="Ingrese email"
                        v-model="data.email"
                    />
                </UFormGroup>
                <UFormGroup label="Dirección">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese dirección"
                        v-model="data.address"
                    />
                </UFormGroup>
                <UFormGroup label="Teléfono/Celular">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese teléfono/celular"
                        v-model="data.phone"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar</UButton>
                    <UButton color="red" @click="storeClient.isOpen = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>

    <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header class="overflow-y-scroll">
                <div class="flex justify-between items-center">
                    <h2>Registrar Cliente</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpen = false"
                    />
                </div>
                <UIAlertMissingFields v-if="storeGloblalUI.ToastFailed.visible">
                    {{ storeGloblalUI.ToastFailed.message }}
                </UIAlertMissingFields>
            </template>
            
            <div class="space-y-3">
                <UFormGroup label="Nombre">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese el nombre"
                        v-model="data.name"
                    />
                </UFormGroup>
                <UFormGroup label="Tipo Cliente">
                    <USelectMenu
                        searchable
                        color="indigo"
                        searchable-placeholder="Busca una categoría"
                        class="w-full"
                        placeholder="Selecciona una categoría"
                        :options="['NATURAL', 'JURIDICO']"
                        v-model="data.desType"
                    />
                </UFormGroup>
                <UFormGroup label="Email">
                    <UInput
                        type="email"
                        color="indigo"
                        placeholder="Ingrese email"
                        v-model="data.email"
                    />
                </UFormGroup>
                <UFormGroup label="Dirección">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese dirección"
                        v-model="data.address"
                    />
                </UFormGroup>
                <UFormGroup label="Teléfono/Celular">
                    <UInput
                        color="indigo"
                        placeholder="Ingrese teléfono/celular"
                        v-model="data.phone"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar</UButton>
                    <UButton color="red" @click="isOpen = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>