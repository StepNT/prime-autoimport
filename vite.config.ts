import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import UnoCSS from 'unocss/vite'
import ViteFonts from 'unplugin-fonts/vite'

export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
        ViteFonts({
            google: {
                families: [
                    {
                        name: 'Inter',
                        styles: 'wght@100;300;400;500;700;900',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
            '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
            '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        },
    },
    optimizeDeps: {
        noDiscovery: true,
    },
})
