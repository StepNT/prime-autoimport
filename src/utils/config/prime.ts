import type { PrimeVueConfiguration } from 'primevue'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import locale from './locale-th'

const themeConfig = {

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
    locale,

} as PrimeVueConfiguration

export { PrimeVue, themeConfig }
