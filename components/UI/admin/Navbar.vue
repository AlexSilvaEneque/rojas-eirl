<script setup lang="ts">
    import { useStoreAuth } from "~/stores/auth";

    defineEmits(['changeToogle'])

    const store = useStoreAuth()

    const items = [
        [
            {
                label: store.user.role!.description,
                slot: 'account',
                disabled: true
            }
        ],
        [
            {
                label: 'Perfil',
                icon: 'i-heroicons-user',
                click: () => {
                    navigateTo('/users/profile')
                }
            }
        ],
        [
            {
                label: 'Cerrar sesión',
                icon: 'i-heroicons-arrow-left-on-rectangle',
                click: () => {
                    localStorage.removeItem('AUTH_TOKEN')
                    navigateTo('/')
                }
            }
        ],
    ]

    const colorMode = useColorMode()
    const isDark = computed({
    get () {
        return colorMode.value === 'dark'
    },
    set () {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
    })
</script>

<template>
    <nav class="w-full h-auto border-1 bg-white dark:bg-gray-900 border-b shadow block lg:flex items-center px-10 pb-2 lg:pb-0">
        <div class="w-fi lg:w-60">
            <img src="/LOGO-MR.svg" class="h-16" alt="">
        </div>

        <div class="flex-1 flex justify-between items-center">
            <!-- <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly> -->
            <UButton
                icon="i-heroicons-bars-3"
                :ui="{
                    rounded: 'rounded-full'
                }"
                color="indigo"
                variant="ghost"
                size="xl"
                @click="$emit('changeToogle')"
            />

            <UDropdown
                :items="items"
                :ui="{ item: { disabled: 'cursor-text select-text' } }"
                :popper="{ placement: 'bottom-start' }"
            >

                <UAvatar
                    :alt="store.user.name"
                    chip-color="indigo"
                    chip-text="En línea"
                    chip-position="top-left"
                    size="md"
                />

                <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                </template>
            </UDropdown>
        </div>
    </nav>
</template>

<style scoped>

</style>