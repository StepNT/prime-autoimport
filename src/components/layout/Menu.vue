<script setup lang="ts">
// import AppMenuItem from '@/components/layout/MenuItem.vue'

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'CRUD', icon: 'pi pi-fw pi-pencil', to: '/crud' },
            // { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        ],
    },

])
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <!-- <AppMenuItem :item="item" :index="i" /> -->
            <LayoutMenuItem :item="item" :index="i" />
            <!-- <AppMenuItem v-if="!item.separator" :item="item" :index="i" /> -->
            <!-- <li v-if="item.separator" class="menu-separator" /> -->
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
