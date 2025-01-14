import { fileURLToPath } from 'node:url'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
    plugins: [
        AutoImport({
            imports: [
                {
                    'vue': [
                        'useId',
                        'ref',
                        'reactive',
                        'watchEffect',
                        'computed',
                        'watch',
                        'defineProps',
                        'defineEmits',
                        'defineExpose',
                        'withDefaults',
                        'toRefs',
                        'toRef',
                        'onMounted',
                        'onUnmounted',
                        'shallowRef',
                        'onBeforeMount',
                        'useTemplateRef',
                    ],
                    'vue-router': ['useRouter', 'useRoute'],
                    'pinia': ['defineStore', 'acceptHMRUpdate'],
                    'zod': ['z'],
                    '@vueuse/core': ['watchDebounced'],
                    'primevue': ['useConfirm', 'useToast'],
                },
            ],
            dirs: ['./src/utils/**', './src/stores', '!./src/utils/config/**'],
            dts: './src/auto-imports.d.ts',
        }),
        Components({
            dirs: ['src/components', '!./src/components/layout/**'],
            dts: './src/components.d.ts',
            directoryAsNamespace: true,
            include: [/\.vue$/, /\.vue\?vue/],
            exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
            resolvers: [PrimeVueResolver()],
        }),
        Layouts({
            layoutsDirs: 'src/components/layout',
            defaultLayout: 'default',
        }),
        VueRouter({
            routesFolder: 'src/pages',
            dts: 'src/typed-router.d.ts',
        }),
        Vue(),
        UnoCSS({
            content: {
                pipeline: {
                    include: ['**/*.vue', '**/*.ts'],
                },
            },
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
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
            },
        },
    },
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
})
