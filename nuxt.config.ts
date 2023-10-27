// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'SCI MR'
    }
  },

  
  runtimeConfig: {
    jwt_secret: process.env.JWT_SECRET
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  pinia: {
    autoImports: [
      'defineStore'
    ]
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primeicons/primeicons.css"
  ],
  build: {
    transpile: ["primevue"]
  }
})
