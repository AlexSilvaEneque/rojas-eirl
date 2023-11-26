<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const { result, sendRequest, convertDatatoChart, labels, data } = useDashboard()

    const testData = ref()

    const setData = () => {
        return {
            labels: labels.value,
            datasets: [
                {
                    label: 'Ventas',
                    tension: 0.5,
                    data: data.value,
                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                },
            ]
        }
    }

    const LineOptions = ref({
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Número de ventas de los últimos 5 meses'
            }
        }
    })

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            direction: 'desc'
        },
        {
            key: 'qty',
            label: 'Cantidad vendida',
            sortable: true,
            direction: 'desc'
        },
        {
            key: 'stock',
            label: 'Stock actual',
            sortable: true,
            direction: 'desc'
        }
    ]

    const dataTable = ref()

    onMounted(async () => {
        await sendRequest()
        dataTable.value = result.value.productsSales.map((product) => {
            return {
                name: product.productSearch.name,
                qty: product._sum.quantity,
                stock: product.productSearch.stock
            }
        })
        testData.value = setData()
        convertDatatoChart(result.value.sales)
    })

    onUnmounted(() => {
        labels.value = []
        data.value = []
    })
</script>

<template>
    <div class="mt-3 grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Ventas</h3>
                <UIcon name="i-heroicons-shopping-cart" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">
                {{ result ? (result.countSale ? result.countSale : 0) : 0}}
            </span>
        </div>
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Ingresos de Ventas</h3>
                <UIcon name="i-heroicons-banknotes" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">
                {{ result ? (result.amountSale._sum.total ? formatCurrency(result.amountSale._sum.total) : formatCurrency(0)) : 0 }}
            </span>
        </div>
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Productos</h3>
                <UIcon name="i-heroicons-cube" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">
                {{ result ? (result.countProduct ? result.countProduct : 0) : 0 }}
            </span>
        </div>
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Clientes</h3>
                <UIcon name="i-heroicons-user-group" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">
                {{ result ? (result.countClient ? result.countClient : 0) : 0 }}
            </span>
        </div>
    </div>

    <div class="mt-10 grid lg:grid-cols-2 gap-4">
        <div class="border rounded shadow py-5 px-3">
            <Chart type="bar" :data="testData" :options="LineOptions" />
        </div>

        <div class="border rounded shadow py-5 px-3">
            <h3 class="text-center pb-3 text-gray-600 font-semibold">Productos más vendidos</h3>
            <UTable :columns="columns" :rows="dataTable" :height="250" />
        </div>
    </div>
    
</template>