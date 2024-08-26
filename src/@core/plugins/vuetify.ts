import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import defaultComponents from './default-components'
import { DefaultTheme } from '@/@core/plugins/LightTheme'

export default createVuetify({
    locale: {
        locale: 'en',
        // locale: 'th',
    },
    date: {
        locale: {
            en: 'en-GB',
            // th: 'th-TH',
        },
    },
    components: { components, ...labsComponents },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },

    theme: {
        defaultTheme: 'DefaultTheme',
        themes: {
            DefaultTheme,
        },
    },
    defaults: defaultComponents,
})
