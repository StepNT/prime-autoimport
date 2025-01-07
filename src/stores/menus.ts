const menus = reactive([
    {
        label: 'Home',
        items: [
            { label: 'Home', icon: 'i-carbon:home', to: '/' },
            { label: 'Product', icon: 'i-carbon:product', to: '/product' },
        ],
    },
])

export function useMenusStore() {
    return {
        menus,
    }
}
