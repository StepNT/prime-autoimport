import { PrimeVue, themeConfig } from '@utils/config/prime'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import App from './App.vue'

import { routerConfig } from './utils/config/router'

import './assets/styles/index.scss'
import 'virtual:uno.css'

const app = createApp(App)
app.use(PrimeVue, themeConfig)
app.use(routerConfig)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
