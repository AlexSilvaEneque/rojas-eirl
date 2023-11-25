<script setup lang="ts">
    import { useStoreAuth } from "~/stores/auth"
    import { useGlobalUI } from "~/stores/globalUI"

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const store = useStoreAuth()
    const storeGlobalUI = useGlobalUI()
    const { q, filteredSales, moreInfo, paySaleForm, deleteItem } = useSale()

</script>

<template>
    <div class="w-full">
        <UIAlertSuccess v-if="storeGlobalUI.ToastSuccess.visible">
            {{ storeGlobalUI.ToastSuccess.message }}
        </UIAlertSuccess>

        <h1 class="font-extrabold text-2xl mb-3">Lista de ventas</h1>
        <div class="flex flex-col items-end">
            <UButton v-if="store.user.role!.description === 'Administrador'"
                label="Registrar nueva venta"
                icon="i-heroicons-plus-circle"
                class="flex-none w-fit py-2"
                color="indigo"
                @click="$router.push('/sale/create')"
            />
        </div>
        <UCard class="border-0 mt-6 w-full">
            <UInput v-model="q" placeholder="Buscar una venta ..."
                icon="i-heroicons-magnifying-glass-20-solid"
                class="w-64"
            />

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredSales"
                class="p-datatable-sm width-detail-table1 mt-3"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} de {last} de {totalRecords}"
            >
                <Column field="date" header="Fecha" style="width: 10%">
                    <template #body="prop">
                        {{ converttoDDMMYYYY(prop.data.date) }}
                    </template>
                </Column>
                <Column header="Cliente" style="width: 25%">
                    <template #body="prop">
                        {{ prop.data.client.name }}
                    </template>
                </Column>
                <Column header="Total" style="width: 15%">
                    <template #body="prop">
                        {{ formatCurrency(prop.data.total) }}
                    </template>
                </Column>
                <Column header="Estado" style="width: 15%">
                    <template #body="prop">
                        <UBadge size="xs"
                            :label="prop.data.status ? prop.data.statusSale === 2 ? 'Pagada' : 'Pendiente de pago' : 'Eliminada'"
                            :color="prop.data.status ? prop.data.statusSale === 2 ? 'primary' : 'amber' : 'rose'"
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
                                    @click="moreInfo(prop.data)"
                                />
                            </UTooltip>

                            <template v-if="prop.data.statusSale !== 2 && store.user.role!.description === 'Administrador'">
                                <UTooltip text="Realizar pago">
                                    <UButton
                                        icon="i-heroicons-clipboard-document-check"
                                        size="sm"
                                        color="indigo"
                                        square
                                        variant="solid"
                                        @click="paySaleForm(prop.data)"
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
                                        @click="deleteItem(prop.data)"
                                    />
                                </UTooltip>
                            </template>
                        </div>
                    </template>
                </Column>
                
            </DataTable>
        </UCard>

        <OthersSaleInfo />
        <OthersSaleDelete />
    </div>
</template>