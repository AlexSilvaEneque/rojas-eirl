<script setup lang="ts">

    const links = [
        {
            label: 'Panel de control',
            icon: 'i-heroicons-home',
            to: '/dashboard'
        },
        {
            label: 'Clientes',
            icon: 'i-heroicons-user-group',
            to: '/client'
        },
        {
            label: 'Categoria',
            icon: 'i-heroicons-squares-2x2',
            to: '/category'
        },
        {
            label: 'Productos',
            icon: 'i-heroicons-square-3-stack-3d',
            to: '/product'
        },
        {
            label: 'Ventas',
            icon: 'i-heroicons-banknotes',
            to: '/sale'
        },
        {
            label: 'Reporte de ventas',
            icon: 'i-heroicons-document-chart-bar',
            to: '/report'
        },
        {
            label: 'Usuarios',
            icon: 'i-heroicons-users',
            to: '/users'
        },
        {
            label: 'Roles',
            icon: 'i-heroicons-key',
            to: '/roles'
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