<script setup lang="ts">
import MenuItemComponent from '@components/layout/components/menuItem.vue'
import { useLayout } from '@stores/layout'

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
    root: {
        type: Boolean,
        default: true,
    },
    parentItemKey: {
        type: String,
        default: null,
    },
})

const route = useRouter()

const { layoutState, setActiveMenuItem, onMenuToggle } = useLayout()

const isActiveMenu = ref(false)
const itemKey = ref<any>(null)

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? `${props.parentItemKey}-${props.index}` : String(props.index)

    const activeItem = layoutState.activeMenuItem ?? ''

    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(`${itemKey.value}-`) : false
})

watch(
    () => layoutState.activeMenuItem,
    (newVal: any) => {
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(`${itemKey.value}-`)
    },
)

function itemClick(event: any, item: any, _index: number) {
    if (item.disabled) {
        event.preventDefault()
        return
    }

    if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
        onMenuToggle()
    }

    if (item.command) {
        item.command({ originalEvent: event, item })
    }

    const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value

    setActiveMenuItem(foundItemKey)
}

function checkActiveRoute(item: any) {
    return route.currentRoute.value.path === item.to
}
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">
            {{ item.label }}
        </div>
        <a
            v-if="(!item.to || item.items) && item.visible !== false"
            tabindex="0"
            :href="item.url"
            :class="item.class"
            :target="item.target"
            @click="itemClick($event, item, index)"
        >
            <i :class="item.icon" class="layout-menuitem-icon" />
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i v-if="item.items" class="layout-submenu-toggler pi pi-fw pi-angle-down" />
        </a>

        <router-link v-if="item.to && !item.items && item.visible !== false" :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to" @click="itemClick($event, item, index)">
            <i :class="item.icon" class="layout-menuitem-icon" />
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler" />
        </router-link>

        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <MenuItemComponent
                    v-for="(child, i) in item.items" :key="child" :index="i"
                    :item="child"
                    :parent-item-key="itemKey"
                    :root="false"
                />
            </ul>
        </Transition>
    </li>
</template>

<style lang="scss" scoped></style>
