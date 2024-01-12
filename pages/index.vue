<script setup lang="ts">
  import { ref } from 'vue'
  import type { IFLogin } from '../interface/index';

  const state : Ref<IFLogin> = ref({
    email: 'admin@mail.com',
    password: '123456'
  })
  const loading = ref<boolean>(false)

  interface errorResponse {
    isError?: boolean
    isShow: boolean
    message: string
  }

  const showErrors = ref(false)
  const errorsResponse = reactive<errorResponse>({
    isError: false,
    isShow: false,
    message: ''
  })

  const handleSubmit = async () => {
    if (Object.values(state.value).includes('')) {
      showErrors.value = true

      setTimeout(() => {
        showErrors.value = false
      }, 4000);

      return
    }

    // TODO: login
    try {
      loading.value = true
      const res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: state.value.email,
          password: state.value.password
        }
      })

      localStorage.setItem('AUTH_TOKEN', res.token)
      errorsResponse.isError = false
      errorsResponse.isShow = true
      errorsResponse.message = 'Inicio de sesión exitoso'

      return navigateTo('/dashboard')  
    } catch (error:any) {
      console.log(error.statusMessage)
      errorsResponse.isError = true
      errorsResponse.isShow = true
      errorsResponse.message = 'Error en las credenciales'
      
    } finally {
      loading.value = false
    }
    
  }

  watch(() => errorsResponse.message, (msg) => {
    if (msg) {
      setTimeout(() => {
        errorsResponse.message = ''
        errorsResponse.isShow = false
      }, 5000);
    }
  })
    
</script>

<template>
  <div class="w-full sm:w-2/3 xl:w-1/3 mx-auto lg:mx-0 lg:px-6 px-10">
    <h1 class="font-black text-2xl lg:text-4xl text-indigo-500 mb-3">Mueblería Rojas</h1>
    <form
      @submit.prevent="handleSubmit()"
      class="space-y-5 w-full"
    >
      <UFormGroup label="Email" name="email" required>
        <UInput
          placeholder="you@exmample.com"
          icon="i-heroicons-envelope"
          v-model="state.email"
          size="md"
          color="indigo"
        />
        <span v-if="showErrors && !state.email" class="block text-red-700 border-l-4 border-l-red-700 pl-2 mt-2">El email es obligatorio</span>
      </UFormGroup>
      <UFormGroup label="Contraseña" name="email" required>
        <UInput
          placeholder="**********"
          icon="i-heroicons-key"
          type="password"
          v-model="state.password"
          size="md"
          color="indigo"
        />
        <span v-if="showErrors && !state.password" class="block text-red-700 border-l-4 border-l-red-700 pl-2 mt-2">La contrasña es obligatoria</span>
      </UFormGroup>
      <UButton type="submit" color="indigo" :disabled="loading" >
        {{ loading ? 'Cargando....' : 'Iniciar sesión'}}
      </UButton>
    </form>
    <UNotification id="" v-if="errorsResponse.isShow && errorsResponse.isError" :title="errorsResponse.message" class="absolute top-3 right-3 w-96 bg-red-500" color="red" :ui="{
      title: 'text-white'
    }" />

    <UNotification id="" v-if="errorsResponse.isShow && !errorsResponse.isError" :title="errorsResponse.message" class="absolute top-3 right-3 w-96 bg-green-500" color="primary" :ui="{
      title: 'text-white'
    }" />
  </div>
</template>