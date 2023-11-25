<script setup lang="ts">
    import { useGlobalUI } from "~/stores/globalUI"

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const route = useRoute()
    const storeGlobalUI = useGlobalUI()
    const { selectedSale, sale, registerPay, flag } = useSale()

    const pay = ref()
    const disabled = ref<boolean>(true)
    const change = ref<string>('')

    const calculateChange = computed(() => {
        if (sale.value?.statusSale === 1) {
            if (pay.value && (pay.value >= (sale.value?.total! - sale.value?.paid!))) {
                const result = pay.value! - (sale.value?.total! - sale.value?.paid!)
                change.value = result.toFixed(2).toString()
                disabled.value = false
            } else {
                change.value = '00.00'
                disabled.value = true
            }
        } else {
            if (pay.value) {
                disabled.value = false
                if (pay.value >= sale.value?.total!) {
                    const result = pay.value! - sale.value?.total!
                    change.value = result.toFixed(2).toString()
                } else {
                    change.value = '00.00'
                }
            } else {
                disabled.value = true
            }
        }
    })
    
    onMounted(async () => {
        await selectedSale(<string>route.params.id)
    })
</script>

<template>
    <UCard class="border-0 mt-6 w-full">
        <UIAlertSuccess v-if="storeGlobalUI.ToastSuccess.visible">
            {{ storeGlobalUI.ToastSuccess.message }}
        </UIAlertSuccess>

        <h1 class="text-xl font-extrabold mb-2">Pagar venta</h1>
        <div class="space-y-3" v-if="sale">
            <div class="grid grid-cols-2">
                <div class="grid grid-cols-2">
                    <span class="font-semibold mr-2">Fecha:</span>
                    <span>{{ converttoDDMMYYYY(sale?.date!) }}</span>
                </div>
                <div class="grid grid-cols-2">
                    <span class="font-semibold mr-2">Vendedor:</span>
                    <span>{{ sale?.user.name }}</span>
                </div>
            </div>
            
            <div class="grid grid-cols-2">
                <div class="grid grid-cols-2">
                    <h3 class="font-semibold mr-2">Cliente:</h3>
                    <span>{{ sale?.client.name }}</span>
                </div>
                <div class="grid grid-cols-2">
                    <h3 class="font-semibold mr-2">Estado de venta:</h3>
                    <span>{{ sale?.statusSale === 2 ? 'Pagada' : 'Pendiente de pago' }}</span>
                </div>
            </div>

            <div>
                <h3 class="font-semibold my-2">Detalle de la venta</h3>
                <DataTable :value="sale.details" class="p-datatable-sm">
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
                    <Column header="Subtotal">
                        <template #body="prop">
                            <span class="text-sm">
                                {{ formatCurrency((prop.data.product.price_sale * prop.data.quantity)) }}
                            </span>
                        </template>
                    </Column>
                    <template #empty>
                        <p class="text-center text-sm">
                            Cargando ...
                        </p>
                    </template>
                </DataTable>
            </div>

            <div class="flex justify-between items-center">
                <h3 class="text-base font-semibold">Total {{ sale.statusSale === 2 ? 'pagado' : 'a pagar' }}</h3>
                <span>{{ formatCurrency(sale.total) }}</span>
            </div>

            <template v-if="sale.statusSale !== 2">
                <div class="flex justify-between items-center" v-if="sale.statusSale === 1">
                    <h3 class="text-sm font-semibold">Primer pago</h3>
                    <span>{{ formatCurrency(sale.paid!) }}</span>
                </div>

                <div class="flex justify-between items-center" v-if="sale.statusSale === 1">
                    <h3 class="text-sm font-semibold">Restante a pagar</h3>
                    <span>{{ formatCurrency((sale.total - sale.paid!)) }}</span>
                </div>

                <div class="flex justify-between items-center">
                    <h3 class="text-sm font-semibold">Monto recibido</h3>
                    <UInput
                        placeholder="00.00"
                        class="w-20"
                        v-model="pay"
                        @keypress="verifyValueMoney"
                        @input="calculateChange"
                    />
                </div>

                <div class="flex justify-between items-center">
                    <h3 class="text-sm font-semibold">Vuelto</h3>
                    <UInput
                        disabled
                        placeholder="00.00"
                        class="w-20"
                        v-model="change"
                    />
                </div>

                <div class="flex justify-center gap-x-2">
                    <UButton
                        label="Confirmar pago"
                        color="emerald"
                        @click="registerPay(sale.total, pay)"
                        :disabled="disabled"
                    />
                    <UButton
                        label="Regresar a ventas"
                        color="sky"
                        @click="navigateTo('/sale')"
                    />
                </div>
            </template>
        </div>

        <div v-else
            class="text-center"
        >
            Cargando ...
        </div>
    </UCard>
</template>
