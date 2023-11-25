<script setup lang="ts">
    import { useStoreCart } from "~/stores/cart"

    const storeCart = useStoreCart()

</script>

<template>
    <DataTable :value="storeCart.items"
        class="p-datatable-sm"
    >
        <Column field="product" header="Producto" />
        <Column header="Precio">
            <template #body="prop">
                {{ formatCurrency(prop.data.price) }}
            </template>
        </Column>
        <Column field="quantity" header="Cantidad" />
        <Column header="Subtotal">
            <template #body="prop">
                {{ formatCurrency(prop.data.subtotal) }}
            </template>
        </Column>
        <Column>
            <template #body="prop">
                <UButton
                    icon="i-heroicons-trash"
                    size="xs"
                    color="rose"
                    variant="soft"
                    @click="storeCart.deleteItems(prop.data)"
                />
            </template>
        </Column>

        <template #empty>
            <p class="text-center text-sm">Sin registros ...</p>
        </template>
    </DataTable>
</template>