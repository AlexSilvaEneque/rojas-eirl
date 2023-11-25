<script setup lang="ts">
    import { PieChart, LineChart } from 'vue-chart-3';
    import { Chart, registerables } from "chart.js";
    import { DatePicker } from 'v-calendar';
    import 'v-calendar/dist/style.css';

    Chart.register(...registerables)

    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const date = ref({
        start: new Date(),
        end: new Date()
    })

    const label = ref()
    const data = ref()

    const testData = ref()

    const setData = () => {
        return {
            labels: label.value,
            datasets: [
                {
                    label: `Del ${format(date.value.start)} al ${format(date.value.end)}`,
                    tension: 0.2,
                    data: data.value,
                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                },
            ],
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
                text: 'Ingreso por ventas'
            }
        }
    })

    const format = (date: any) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }

    const submit = async () => {
        const res = await $fetch(`/api/sale/reports?start=${format(date.value.start)}&end=${format(date.value.end)}`)
        
        label.value = res.group1.map((item : any) => {
            const dateObj = item[Object.keys(item)[0]];
            return dateObj.date;
        })

        data.value = res.group2.map((item : any) => {
            const dateObj = item[Object.keys(item)[0]];
            return dateObj.total;
        })
    }

    watchEffect(() => {
        testData.value = setData()
    })

</script>

<template>
    <div class="w-full">
        <h1 class="text-2xl font-extrabold text-gray-800">Reporte de ventas</h1>
        <UCard class="w-full mt-3">
            <h3 class="text-md">Seleccione un rango de fechas</h3>
            <div class="w-full mt-2 flex gap-x-1 items-center">
                <DatePicker v-model="date" is-range>
                    <template #default="{ inputValue, inputEvents }">
                    <div class="flex justify-start items-center gap-x-2">
                        <UInput
                            size="md"
                            v-model="inputValue.start"
                            v-on="inputEvents.start"
                        />
                        <UIcon name="i-heroicons-arrow-right" />
                        <UInput
                            size="md"
                            v-model="inputValue.end"
                            v-on="inputEvents.end"
                        />
                    </div>
                    </template>
                </DatePicker>
                <UButton
                    icon="i-heroicons-funnel"
                    color="indigo"
                    size="md"
                    @click="submit"
                />
            </div>
            
            <LineChart :chartData="testData" :options="LineOptions" :height="450" />
        </UCard>
    </div>
</template>