<script setup lang="ts">
    import { useGlobalUI } from "~/stores/globalUI"
    import { useStoreProduct } from "~/stores/product"
    import { useStoreAuth } from "~/stores/auth"

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const store = useStoreAuth()
    const storeGlobalUI = useGlobalUI()
    const storeProduct = useStoreProduct()
</script>

<template>
    <div class="w-full">
        <UIAlertSuccess v-if="storeGlobalUI.ToastSuccess.visible">
            {{ storeGlobalUI.ToastSuccess.message }}
        </UIAlertSuccess>

        <h1 class="font-extrabold text-2xl mb-3">Lista de Productos</h1>
        <div class="flex flex-col items-end">
            <UButton v-if="store.user.role!.description === 'Administrador'"
                label="Registrar producto"
                icon="i-heroicons-plus-circle"
                class="flex-none w-fit py-2"
                color="indigo"
                @click="storeProduct.isOpen = true"
            />
        </div>
        <UCard class="border-0 mt-6 w-full">

            <UInput v-model="storeProduct.q" placeholder="Buscar producto ..."
                icon="i-heroicons-magnifying-glass-20-solid"
                class="w-64"
            />

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="storeProduct.filteredProducts"
                class="p-datatable-sm width-detail-table1 mt-3"
            >
                <Column field="name" header="Nombre" style="width: 20%" />
                <Column field="price_sale" header="Precio venta" style="width: 20%" />
                <Column field="stock" header="Stock" style="width: 20%" />
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
                            <UTooltip text="Ver más información">
                                <UButton
                                    icon="i-heroicons-eye"
                                    size="sm"
                                    color="sky"
                                    square
                                    variant="solid"
                                    @click="storeProduct.moreInfo(prop.data)"
                                />
                            </UTooltip>

                            <UTooltip text="Registrar nuevo ingreso del producto">
                                <UButton
                                    icon="i-heroicons-clipboard-document-list"
                                    size="sm"
                                    color="violet"
                                    square
                                    variant="solid"
                                    @click="storeProduct.newEntry(prop.data)"
                                />
                            </UTooltip>

                            <template v-if="store.user.role!.description === 'Administrador'">
                                <UTooltip text="Editar información">
                                    <UButton
                                        icon="i-heroicons-pencil-square"
                                        size="sm"
                                        color="primary"
                                        square
                                        variant="solid"
                                        @click="storeProduct.editItem(prop.data)"
                                    />
                                </UTooltip>
                            </template>

                            <template v-if="prop.data.status && store.user.role!.description === 'Administrador'">
                                <UTooltip text="Eliminar">
                                    <UButton
                                        icon="i-heroicons-trash"
                                        size="sm"
                                        color="red"
                                        square
                                        variant="solid"
                                        @click="storeProduct.deleteItem(prop.data)"
                                    />
                                </UTooltip>
                            </template>

                            <template v-if="!prop.data.status">
                                <UTooltip text="Habilitar" >
                                    <UButton
                                        icon="i-heroicons-arrow-up-on-square-stack"
                                        size="sm"
                                        color="yellow"
                                        square
                                        variant="solid"
                                        @click="storeProduct.enableItem(prop.data)"
                                    />
                                </UTooltip>
                            </template>
                        </div>
                    </template>
                </Column>
                
            </DataTable>
        </UCard>

        <OthersProductCreate />

        <OthersProductInfo />

        <OthersProductNewEntry />

        <OthersProductEdit />

        <OthersProductDelete />

        <OthersProductEnable />
    </div>
</template>