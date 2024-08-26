import { createApp } from 'vue'

import Aura from '@primevue/themes/aura'
import type { PrimeVueConfiguration } from 'primevue/config'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import routerConfig from '@core/router'
import App from './App.vue'

import '@/assets/styles.scss'
import 'virtual:uno.css'

const app = createApp(App)

app.use(routerConfig)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities',
            },
        },
    },

} as PrimeVueConfiguration)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
