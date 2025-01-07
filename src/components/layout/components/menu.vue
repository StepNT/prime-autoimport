<script setup lang="ts">
import MenuItemComponent from '../components/menuItem.vue'

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Product', icon: 'pi pi-fw pi-pencil', to: '/product' },
        ],
    },

])
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <!-- <AppMenuItem :item="item" :index="i" /> -->
            <MenuItemComponent :item="item" :index="i" />
            <!-- <AppMenuItem v-if="!item.separator" :item="item" :index="i" /> -->
            <!-- <li v-if="item.separator" class="menu-separator" /> -->
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
