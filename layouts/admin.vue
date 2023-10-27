<script setup lang="ts">
  import { ref, onMounted, provide } from 'vue';
  import { useStoreAuth } from '~/stores/auth'
  import { Toggle } from '../interface/index';

  const useStore = useStoreAuth()
  const toggle = ref<boolean>(true)
  const flag = ref(false)
  const width = ref<number>()

  const changeToggle = () => {
    toggle.value = !toggle.value
  }

  onMounted(() => {
    width.value = window.innerWidth

    window.addEventListener('resize', () => {
      width.value = window.innerWidth
    })

    width.value! <= 1023 ? toggle.value = false : toggle.value = true

    if (useStore.user) {
      flag.value = true
    }

  })

  watch(useStore.user, () => {
    if (useStore.user) {
      flag.value = true
    } else {
      flag.value = false
    }
  })

  watch(width, () => {
    width.value! <= 1023 ? toggle.value = false : toggle.value = true
  })

  provide<Toggle>('toggle', {
    toggle,
    changeT: changeToggle
  })

  const ui = {
    "base": "mx-auto",
    "padding": "px-4 sm:px-6 lg:px-8",
    "constrained": "max-w-full"
  }
</script>

<template>
  <div v-if="flag">

    <UIAdminNavbar @change-toogle="changeToggle" class="relative" />

    <div class="w-full border flex custom-height overflow-y-scroll">
      <div class="hidden lg:block md:w-min border shadow" v-if="toggle">
        <UIAdminSidebar />
      </div>

      <div class="absolute z-20 bg-white h-screen border shadow" v-if="toggle && width!<=1023">
        <UIAdminSidebarMovil />
      </div>

      <div class="w-full flex-1">
        <UContainer :ui="ui">
          <!-- main content -->
          <slot />
        </UContainer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-height {
  min-height: calc(100vh - 80px);
}
</style>