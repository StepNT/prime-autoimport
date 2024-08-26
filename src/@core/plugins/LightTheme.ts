import type { ThemeTypes } from '@/types/@commons/ThemeType'

const DefaultTheme: ThemeTypes = {
    name: 'DefaultTheme',
    dark: false,
    // call in css and scss --v-theme-xxxxxx ex : --v-theme-primary
    colors: {
        primary: '#4680FF',
        secondary: '#5B6B79',
        info: '#3ec9d6',
        success: '#2ca87f',
        warning: '#e58a00',
        error: '#dc2626',
        lightprimary: '#E9F0FF',
        lightsecondary: '#F8F9FA',
        lightsuccess: '#c0e5d9',
        lightinfo: '#c5eff3',
        lighterror: '#f5bebe',
        lightwarning: '#f7dcb3',
        lightText: '#5B6B79',
        borderLight: '#e8ebee',
        inputBorder: '#BEC8D0',
        containerBg: '#F8F9FA',
        surface: '#fff',
    },
}

export { DefaultTheme }
