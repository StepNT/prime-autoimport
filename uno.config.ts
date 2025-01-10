import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    shortcuts: [
        {
            'input-group': 'grid-cols-12 grid gap-2 items-baseline m-2 [&_label]:md:text-right [&_input]:w-full [&_.p-select]:w-full [&_textarea]:w-full',
        },
        [/^row-(.*)$/, ([, c]) => `grid flex-row md:grid-cols-${c}`],
        [/^input-group-col-(.*)$/, ([, c]) => `col-span-12 md:col-span-${c}`],
    ],
    rules: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
})
