import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    shortcuts: [
        {
            'input': 'w-full',
            'p-select': 'w-full',
            'textarea': 'w-full',

            'input-row': 'grid-cols-12 grid gap-1 items-baseline p-2 [&_label]:md:text-right [&_label]:md:mr-2 [&_label]:font-semibold',
            'input-row-left': 'input-row [&_label]:md:!text-left',
            'input-col': 'grid p-2 gap-1 items-baseline [&_label]:md:mr-2 [&_label]:font-semibold',

            // icon
            'animate-header': 'animate-tada animate-duration-4s animate-count-infinite',
            'animate-btn-action': 'animate-tada animate-duration-2s animate-count-infinite',
            'animate-btn': 'animate-tada animate-duration-4s animate-count-infinite',
        },
        [/^row-col-(\d+)$/, ([, c]) => `grid flex-row md:grid-cols-${c}`],
        [/^col-(\d+)$/, ([, c]) => `col-span-12 md:col-span-${c}`],
        [/^animate-icon-(\w+)$/, ([, a]) => `animate-${a} animate-duration-3s animate-count-infinite`],
    ],
    rules: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
})
