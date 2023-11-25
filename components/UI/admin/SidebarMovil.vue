<script setup lang="ts">
    import { Toggle } from "~/interface";

    const { toggle, changeT } = inject('toggle') as Toggle

    const links = [
        {
            label: 'Panel de control',
            icon: 'i-heroicons-home',
            to: '/dashboard',
            click: () => changeT()
        },
        {
            label: 'Categoria',
            icon: 'i-heroicons-squares-2x2',
            to: '/category',
            click: () => changeT()
        },
        {
            label: 'Productos',
            icon: 'i-heroicons-square-3-stack-3d',
            to: '/product',
            click: () => changeT()
        },
        {
            label: 'Ventas',
            icon: 'i-heroicons-banknotes',
            to: '/sale',
            click: () => changeT()
        },
        {
            label: 'Reporte de ventas',
            icon: 'i-heroicons-document-chart-bar',
            to: '/report',
            click: () => changeT()
        },
        {
            label: 'Usuarios',
            icon: 'i-heroicons-user-group',
            to: '/users',
            click: () => changeT()
        },
        {
            label: 'Roles',
            icon: 'i-heroicons-key',
            to: '/roles',
            click: () => changeT()
        },
    ]
</script>

<template>
    <nav class="w-60">
        <UVerticalNavigation
            :links="links"
            :ui="{
                label: 'text-[16px]',
                padding: 'py-3'
            }"
        />
    </nav>
</template>