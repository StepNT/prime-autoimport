const menus = reactive([
    {
        label: 'Home',
        items: [
            { label: 'Home', icon: 'i-carbon:home', to: '/' },
            { label: 'Product', icon: 'i-carbon:product', to: '/product' },
            { label: 'upload', icon: 'i-carbon:cloud-upload', to: '/upload' },
        ],
    },
])

export function useMenusStore() {
    return {
        menus,
    }
}
