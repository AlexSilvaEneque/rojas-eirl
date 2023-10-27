<script setup lang="ts">
    import { useStoreAuth } from "~/stores/auth";
    import type { IFUser } from '../../interface/index';

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    interface Toast {
        visible: boolean
        message?: string
    }

    const store = useStoreAuth()
    const user = ref<IFUser | any>()
    const password = ref<string>('')
    const toastSuccess : Toast = reactive({ visible: false })

    const handlerSubmit = async () => {
        try {
            let res = await $fetch<{ msg: string }>('/api/user/'+user.value.id, {
                method: 'PUT',
                body: {
                    ...user.value,
                    password: password.value
                }
            })
            toastSuccess.visible = true
            toastSuccess.message = res.msg
        } catch (error) {
            console.log(error)
        } finally {
            password.value = ''
        }
    }

    watch(() => toastSuccess.visible, () => {
        if (toastSuccess.visible) {
            setTimeout(() => {
                toastSuccess.visible = false
            }, 4000)
        }
    })

    onMounted(() => {
        user.value = store.user
    })
</script>

<template>
    <div class="w-full">
        <UIAlertSuccess v-if="toastSuccess.visible">
            {{ toastSuccess.message }}
        </UIAlertSuccess>

        <h1 class="font-extrabold text-2xl mb-3 mt-6">Actualizar Perfil</h1>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <div class="grid grid-cols-3 gap-x-2 gap-y-5" v-if="user">
                <UFormGroup label="Nombre">
                    <UInput
                        color="indigo"
                        v-model="user.name"
                    />
                </UFormGroup>
                <UFormGroup label="Email">
                    <UInput
                        color="indigo"
                        v-model="user.email"
                    />
                </UFormGroup>
                <UFormGroup label="Teléfono">
                    <UInput
                        color="indigo"
                        v-model="user.phone"
                    />
                </UFormGroup>
                <UFormGroup label="Dirección">
                    <UInput
                        color="indigo"
                        v-model="user.address"
                    />
                </UFormGroup>
                <UFormGroup label="Contraseña">
                    <UInput
                        color="indigo"
                        type="password"
                        v-model="password"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <UButton class="mr-2" color="indigo" @click="handlerSubmit">Guardar cambios</UButton>
            </template>
        </UCard>
    </div>
</template>