import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    shortcuts: [
        {
            'input': 'w-full',
            'p-select': 'w-full',
            'textarea': 'w-full',

            'input-group': 'grid-cols-12 grid gap-2 items-baseline m-2 [&_label]:md:text-right [&_label]:md:mr-2 [&_label]:font-semibold',
            'input-group-left': 'input-group [&_label]:md:!text-left',
        },
        [/^row-(\d+)$/, ([, c]) => `grid flex-row md:grid-cols-${c}`],
        [/^col-(\d+)$/, ([, c]) => `col-span-12 md:col-span-${c}`],
    ],
    rules: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
})
