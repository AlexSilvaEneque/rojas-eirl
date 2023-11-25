<script setup lang="ts">
    const { isOpenInfo, sale } = useSale()

    const status = computed(() => sale.value?.status ? (sale.value?.statusSale === 2 ? ['Pagada', 'primary', 'pagado'] : ['Pendiente de pago', 'amber', 'a pagar']) : ['Eliminada', 'rose', ''])
</script>

<template>
    <UModal v-model="isOpenInfo" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>Información de la Venta</h2>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpenInfo = false"
                    />
                </div>
            </template>

            <div class="grid grid-cols-1 gap-y-2 space-y-2" v-if="sale">
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Fecha:</h3>
                    <span>
                        {{ converttoDDMMYYYY(sale!.date) }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Cliente:</h3>
                    <span>
                        {{ sale?.client.name }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <UBadge size="xs"
                            :label="status[0]"
                            :color="status[1]"
                        />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Vendedor:</h3>
                    <span>
                        {{ sale?.user.name }}
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Detalle de la venta</h3>
                </div>
                <div>
                    <DataTable :value="sale?.details" class="p-datatable-sm">
                        <Column header="Producto">
                            <template #body="prop">
                                <span class="text-sm">
                                    {{ prop.data.product.name }}
                                </span>
                            </template>
                        </Column>
                        <Column header="Cantidad">
                            <template #body="prop">
                                <span class="text-sm">
                                    {{ prop.data.quantity }}
                                </span>
                            </template>
                        </Column>
                        <Column header="Precio">
                            <template #body="prop">
                                <span class="text-sm">
                                    {{ formatCurrency(prop.data.product.price_sale) }}
                                </span>
                            </template>
                        </Column>
                        <Column header="Subtotal" style="text-align: right;">
                            <template #body="prop">
                                <span class="text-sm">
                                    {{ formatCurrency((prop.data.product.price_sale * prop.data.quantity)) }}
                                </span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium text-left">Total {{ status[2] }}:</h3>
                    <h3 class="text-right pr-1">{{ formatCurrency(sale.total) }}</h3>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-y-2 space-y-" v-else>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Fecha:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Cliente:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Estado:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Vendedor:</h3>
                    <span>
                        <USkeleton class="h-6 w-[180px]" />
                    </span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium">Detalle de la venta</h3>
                </div>
                <div>
                    <DataTable class="p-datatable-sm">
                        <Column header="Producto" />
                        <Column header="Cantidad" />
                        <Column header="Precio" />
                        <Column header="Subtotal" />
                        <template #empty>
                            <p class="text-center text-sm">
                                Cargando ...
                            </p>
                        </template>
                    </DataTable>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-medium text-left">
                        <span>
                            <USkeleton class="h-6 w-[180px]" />
                        </span>
                    </h3>
                    <h3 class="text-right pr-1">
                        <span>
                            <USkeleton class="h-6 w-[180px]" />
                        </span>
                    </h3>
                </div>
            </div>
        </UCard>
    </UModal>
</template>