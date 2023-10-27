<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const people = [
        {
            id: 1,
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            email: 'lindsay.walton@example.com',
            role: 'Member'
        },
        {
            id: 2,
            name: 'Courtney Henry',
            title: 'Designer',
            email: 'courtney.henry@example.com',
            role: 'Admin'
        },
        {
            id: 3,
            name: 'Tom Cook',
            title: 'Director of Product',
            email: 'tom.cook@example.com',
            role: 'Member'
        },
        {
            id: 4,
            name: 'Whitney Francis',
            title: 'Copywriter',
            email: 'whitney.francis@example.com',
            role: 'Admin'
        },
        {
            id: 5,
            name: 'Leonard Krasner',
            title: 'Senior Designer',
            email: 'leonard.krasner@example.com',
            role: 'Owner'
        },
        {
            id: 6,
            name: 'Floyd Miles',
            title: 'Principal Designer',
            email: 'floyd.miles@example.com',
            role: 'Member'
        }
    ]

    const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'User name'
}, {
  key: 'title',
  label: 'Job position',
  sortable: true
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role'
}]

const pageCount = 5
const page = ref(1)
</script>

<template>
    <div class="w-full">
        <h1 class="font-extrabold text-2xl mb-3">Lista de Ventas</h1>
        <div class="flex flex-col items-end">
            <UButton label="Crear categoria"
                icon="i-heroicons-plus-circle"
                class="flex-none w-fit py-2"
            />
        </div>
        <UCard class="border-0 mt-6 w-full">
            <UTable :columns="columns" :rows="people" :sort="{ column: 'title' }"  />
            
            <UPagination v-model="page" :page-count="pageCount" :total="people.length"
                :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
                class="mt-3"
            >
                <template #prev="{ onClick }">
                    <UTooltip text="Previous page">
                        <UButton icon="i-heroicons-arrow-small-left-20-solid" color="primary" :ui="{ rounded: 'rounded-full' }" class="rtl:[&_span:first-child]:rotate-180 me-2" @click="onClick" />
                    </UTooltip>
                </template>

                <template #next="{ onClick }">
                    <UTooltip text="Next page">
                        <UButton
                            icon="i-heroicons-arrow-small-right-20-solid"
                            color="primary"
                            :ui="{ rounded: 'rounded-full' }"
                            class="rtl:[&_span:last-child]:rotate-180 ms-2" @click="onClick"
                        />
                    </UTooltip>
                </template>
            </UPagination>
        </UCard>
    </div>
</template>