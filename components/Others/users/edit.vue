<script setup lang="ts">
    import { useGlobalUI } from '~/stores/globalUI'
    import { useStoreRole } from '~/stores/role'
    import { CreateUser } from '../../../interface/user';

    const storeRol = useStoreRole()
    const storeGloblalUI = useGlobalUI()

    const { isOpenEdit, handlerSubmitEdit, user } = useUsers()

    const data = reactive<CreateUser>({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        roleId: '',
        role: ''
    })

    const selectedRole = computed(() => storeRol.roles.find(rol => rol.description === data.role) )

    const handlerSubmit = async () => {
        data.roleId = selectedRole.value?.id!
        await handlerSubmitEdit(data)
    }

    watchEffect(async () => {
        if (isOpenEdit.value) {
            data.name = user.value?.name!
            data.email = user.value?.email!
            data.address = user.value?.address!
            data.phone = user.value?.phone!
            data.password = ''
            data.roleId = user.value?.roleId!
            data.role = user.value?.role?.description!
        } else {
            await storeRol.loadRoles()
        }
    })
</script>

<template>
    <UModal v-model="isOpenEdit" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header class="overflow-y-scroll">
                <div class="flex justify-between items-center">
                    <h2>Editar usuario</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenEdit = false"
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
                <UFormGroup label="Rol">
                    <USelectMenu
                        searchable
                        color="indigo"
                        searchable-placeholder="Busca una rol"
                        class="w-full"
                        placeholder="Selecciona un rol"
                        value-attribute="description"
                        option-attribute="description"
                        :options="storeRol.roles"
                        v-model="data.role"
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
                <UFormGroup label="Contraseña">
                    <UInput
                        type="password"
                        color="indigo"
                        placeholder="********"
                        v-model="data.password"
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
                    <UButton color="red" @click="isOpenEdit = false">Cancelar</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>