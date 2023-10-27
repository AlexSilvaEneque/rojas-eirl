<script setup lang="ts">
    import { PieChart, LineChart } from 'vue-chart-3';
    import { Chart, registerables } from "chart.js";

    Chart.register(...registerables)

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const testData = {
        labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
        datasets: [
            {
                label: 'Ventas',
                data: [30, 40, 60, 70, 5],
                backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
            },
        ],
    }

    const LineOptions = ref({
        // responsive: true,
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
            key: 'category',
            label: 'Categoria',
            sortable: true,
            direction: 'desc'
        },
        {
            key: 'qty',
            label: 'Stock actual',
            sortable: true,
            direction: 'desc'
        }
    ]

    const people = [
        {
            name: 'Lindsay Walton',
            category: 'Front-end Developer',
            qty: 13
        },
        {
            name: 'Courtney Henry',
            category: 'Designer',
            qty: 129
        },
        {
            name: 'Tom Cook',
            category: 'Director of Product',
            qty: 111
        },
        {
            name: 'Whitney Francis',
            category: 'Copywriter',
            qty: 23
        },
        {
            name: 'Leonard Krasner',
            category: 'Senior Designer',
            qty: 22
        },
        {
            name: 'Floyd Miles',
            category: 'Principal Designer',
            qty: 92
        }
    ]
</script>

<template>
    <div class="mt-3 grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Ventas</h3>
                <UIcon name="i-heroicons-shopping-cart" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">120</span>
        </div>
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Ingresos de Ventas</h3>
                <UIcon name="i-heroicons-banknotes" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">S/. 12000.00</span>
        </div>
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Productos</h3>
                <UIcon name="i-heroicons-cube" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">120</span>
        </div>
        <div class="border rounded py-4 px-3 shadow">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-semibold">Clientes</h3>
                <UIcon name="i-heroicons-user-group" class="text-xl" />
            </div>
            <span class="font-black text-xl float-right">50</span>
        </div>
    </div>

    <div class="mt-10 grid lg:grid-cols-2 gap-4">
        <div class="border rounded shadow py-5 px-3">
            <LineChart :chartData="testData" :options="LineOptions" />
        </div>

        <div class="border rounded shadow py-5 px-3">
            <h3 class="text-center pb-3 text-gray-600 font-semibold">Productos más vendidos</h3>
            <UTable :columns="columns" :rows="people" />
        </div>
    </div>
    
</template>

<style scoped>

</style>