import { createApp } from 'vue'

import Aura from '@primevue/themes/aura'
import type { PrimeVueConfiguration } from 'primevue/config'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import router from './router'
import App from './App.vue'

import '@/assets/styles.scss'
import 'virtual:uno.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: false,
        },
    },

} as PrimeVueConfiguration)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
