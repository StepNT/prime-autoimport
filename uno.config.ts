import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    shortcuts: {
        // 'grid': 'flex flex-wrap',
        // 'btn-footer': 'flex flex-wrap mt-0rem mb-0rem mr-1rem ml-1rem justify-end gap-1',
        // 'row': 'flex flex-wrap mr-0 ml-0 mt--0.5rem mb--1.25rem',
        // 'row': 'flex flex-wrap',
        // 'row': 'flex flex-wrap',
        //
        'input-group': 'grid-cols-12 grid gap-2 items-baseline [&_label]:md:text-right [&_div]:sm:col-span-12',
        // t
    },
    rules: [
        // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
        // [/^p-(\d+)$/, match => ({ padding: `${Number(match[1]) / 4}rem` })],

        // [/^col$/, () => ({ flexGrow: 1, flexBasis: 0 })],
        // [/^col-auto$/, () => ({ flex: '0 0 auto' })],

        // [/^col-(\d+)$/, ([, d]) => ({
        //     // padding: '0.3rem !important',
        //     // 'text-align': 'end',
        //     width: `${(Number(d) / 12) * 100}%`,
        // })],

        // [/^col-(\d+)$/, ([, d]) => ({
        //     // padding: '0.3rem !important',
        //     // 'text-align': 'end',
        //     width: `${(Number(d) / 12) * 100}%`,
        // })],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
})
