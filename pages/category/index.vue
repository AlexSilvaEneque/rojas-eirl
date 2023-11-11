<script setup lang="ts">
    import { useStoreAuth } from "~/stores/auth"
    import { useGlobalUI } from "~/stores/globalUI"
    import { useStoreCategory } from "~/stores/category"

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const store = useStoreAuth()
    const storeGlobalUI = useGlobalUI()
    const storeCategory = useStoreCategory()
</script>

<template>
    <div class="w-full">
        <UIAlertSuccess v-if="storeGlobalUI.ToastSuccess.visible">
            {{ storeGlobalUI.ToastSuccess.message }}
        </UIAlertSuccess>

        <h1 class="font-extrabold text-2xl mb-3">Lista de Categorías</h1>
        <div class="flex flex-col items-end">
            <UButton v-if="store.user.role!.description === 'Administrador'"
                label="Registrar categoría"
                icon="i-heroicons-plus-circle"
                class="flex-none w-fit py-2"
                color="indigo"
                @click="storeCategory.isOpen = true"
            />
        </div>
        <UCard class="border-0 mt-6 w-full">

            <UInput v-model="storeCategory.q" placeholder="Buscar categoría ..."
                icon="i-heroicons-magnifying-glass-20-solid"
                class="w-64"
            />

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="storeCategory.filteredCategories"
                class="p-datatable-sm width-detail-table1 mt-3"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} de {last} de {totalRecords}"
            >
                <Column field="name" header="Nombre" style="width: 20%" />
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
                                @click="storeCategory.moreInfo(prop.data)"
                            />
                            <UButton v-if="store.user.role!.description === 'Administrador'"
                                icon="i-heroicons-pencil-square"
                                size="sm"
                                color="primary"
                                square
                                variant="solid"
                                @click="storeCategory.editItem(prop.data)"
                            />
                            <UButton v-if="prop.data.status && store.user.role!.description === 'Administrador'"
                                icon="i-heroicons-trash"
                                size="sm"
                                color="red"
                                square
                                variant="solid"
                                @click="storeCategory.deleteItem(prop.data)"
                            />
                            <UButton v-if="!prop.data.status"
                                icon="i-heroicons-arrow-up-on-square-stack"
                                size="sm"
                                color="yellow"
                                square
                                variant="solid"
                                @click="storeCategory.enableItem(prop.data)"
                            />
                        </div>
                    </template>
                </Column>
                
            </DataTable>
        </UCard>

        <OthersCategoryCreate />

        <OthersCategoryInfo />

        <OthersCategoryEdit />

        <OthersCategoryDelete />

        <OthersCategoryEnable />
    </div>
</template>