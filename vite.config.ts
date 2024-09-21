import { fileURLToPath } from 'node:url'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
    plugins: [
        AutoImport({
            imports: [
                VueRouterAutoImports,
                {
                    typescript: [
                        'readonly',
                        'Record',
                        'Partial',
                        'Pick',
                        'Omit',
                        'Exclude',
                        'Extract',
                        'NonNullable',
                        'ReturnType',
                        'InstanceType',
                        'Required',
                        'ThisType',
                        'PromiseLike',
                        'ReadonlyArray',
                        'TemplateStringsArray',
                        'Uppercase',
                        'Lowercase',
                        'Capitalize',
                        'Uncapitalize',
                        'Parameters',
                        'ConstructorParameters',
                        'Tuple',
                        'Awaited',
                        'never',
                    ],
                    vue: [
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
                    ],
                    // pinia: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
                    // zod: ['z'],
                },
            ],
            dirs: ['./src/**'],
            dts: './src/auto-imports.d.ts',
        }),
        Components({
            dirs: ['src/components'],
            dts: './src/components.d.ts',
            directoryAsNamespace: true,
            include: [/\.vue$/, /\.vue\?vue/],
            exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
            resolvers: [PrimeVueResolver()],
        }),
        Layouts({
            layoutsDirs: 'src/@core/layouts',
            defaultLayout: 'default',
        }),
        VueRouter({
            routesFolder: 'src/pages',
            dts: true,
        }),
        vue(),
        UnoCSS(),
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
                api: 'modern-compiler',
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
    optimizeDeps: {
        noDiscovery: true,
    },
})
