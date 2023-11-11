<script setup lang="ts">
    import { useStoreAuth } from "~/stores/auth"
    import { useGlobalUI } from "~/stores/globalUI"
    

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const store = useStoreAuth()
    const storeGlobalUI = useGlobalUI()
    const { filteredUsers, q, isOpen, moreInfo, editItem, deleteItem, enableItem, loading } = useUsers()
    
</script>

<template>
<div class="w-full">
        <UIAlertSuccess v-if="storeGlobalUI.ToastSuccess.visible">
            {{ storeGlobalUI.ToastSuccess.message }}
        </UIAlertSuccess>

        <h1 class="font-extrabold text-2xl mb-3">Lista de usuarios</h1>
        <div class="flex flex-col items-end">
            <UButton v-if="store.user.role!.description === 'Administrador'"
                label="Registrar usuario"
                icon="i-heroicons-plus-circle"
                class="flex-none w-fit py-2"
                color="indigo"
                @click="isOpen = true"
            />
        </div>
        <UCard class="border-0 mt-6 w-full">

            <UInput v-model="q" placeholder="Buscar usuario ..."
                icon="i-heroicons-magnifying-glass-20-solid"
                class="w-64"
            />

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredUsers"
                class="p-datatable-sm width-detail-table1 mt-3"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} de {last} de {totalRecords}"
                :loading="loading"
            >
                <template #empty>
                    <div class="w-full text-center">
                        No hay registros
                    </div>
                </template>

                <template #loading> Cargando los registros </template>

                <Column field="name" header="Nombre" style="width: 20%" />
                <Column header="Rol" style="width: 20%" >
                    <template #body="prop">
                        {{ prop.data.role.description }}
                    </template>
                </Column>
                <Column header="Estado" style="width: 15%">
                    <template #body="prop">
                        <UBadge size="xs"
                            :label="prop.data.status ? 'Activo' : 'Eliminado'"
                            :color="prop.data.status ? 'primary' : 'red'"
                        />
                    </template>
                </Column>
                <Column header="Opciones" style="width: 15%">
                    <template #body="prop">
                        <div class="flex gap-x-1">
                            <UButton
                                icon="i-heroicons-eye"
                                size="sm"
                                color="sky"
                                square
                                variant="solid"
                                @click="moreInfo(prop.data)"
                            />
                            <UButton v-if="store.user.role!.description === 'Administrador'"
                                icon="i-heroicons-pencil-square"
                                size="sm"
                                color="primary"
                                square
                                variant="solid"
                                @click="editItem(prop.data)"
                            />
                            <UButton v-if="prop.data.status && store.user.role!.description === 'Administrador'"
                                icon="i-heroicons-trash"
                                size="sm"
                                color="red"
                                square
                                variant="solid"
                                @click="deleteItem(prop.data)"
                            />
                            <UButton v-if="!prop.data.status"
                                icon="i-heroicons-arrow-up-on-square-stack"
                                size="sm"
                                color="yellow"
                                square
                                variant="solid"
                                @click="enableItem(prop.data)"
                            />
                        </div>
                    </template>
                </Column>
                
            </DataTable>
        </UCard>

        <OthersUsersCreate />

        <OthersUsersInfo />

        <OthersUsersEdit />

        <OthersUsersDelete />

        <OthersUsersEnable />
    </div>
</template>