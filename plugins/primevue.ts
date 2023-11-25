import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true,
        locale: {
            accept:"Aceptar",

        }
    })
    nuxtApp.vueApp.component("Button", Button)
    nuxtApp.vueApp.component("Avatar", Avatar)
    nuxtApp.vueApp.component("Menu", Menu)
    nuxtApp.vueApp.component("DataTable", DataTable)
    nuxtApp.vueApp.component("Column", Column)
})