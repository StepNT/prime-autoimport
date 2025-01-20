const menus = reactive([
    {
        label: 'Home',
        items: [
            { label: 'Home', icon: 'i-carbon:home', to: '/' },
            { label: 'Product', icon: 'i-carbon:product', to: '/product' },
            { label: 'Upload', icon: 'i-carbon:fetch-upload-cloud', to: '/upload' },
        ],
    },
])

export function useMenusStore() {
    return {
        menus,
    }
}
