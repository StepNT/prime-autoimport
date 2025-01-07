const menus = reactive([
    {
        label: 'Home',
        items: [
            { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Product', icon: 'pi pi-fw pi-pencil', to: '/product' },
        ],
    },
])

export function useMenusStore() {
    return {
        menus,
    }
}
