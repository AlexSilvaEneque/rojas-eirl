// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  colorMode: {
    preference: 'light'
  },

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

  routeRules: {
    '/api/**': { cors: true }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt'
  ],
  pinia: {
    autoImports: [
      'defineStore'
    ]
  },
  pwa: {
    manifest: {
      name: 'Mueblería Rojas',
      short_name: 'SCI MR',
      description: 'Sistema de control de inventario',
      theme_color: "#fff",
      icons: [
        {
          src: "LOGO-MR192.svg",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "LOGO-MR512.svg",
          sizes: "512x512",
          type: "image/png",
        },
      ]
    }
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primeicons/primeicons.css"
  ],
  build: {
    transpile: [
      "primevue",
      "chart.js"
    ]
  }
})
