<script setup lang="ts">
import MenuItemComponent from '../components/menuItem.vue'

const menuStore = useMenusStore()
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in menuStore.menus" :key="item">
            <!-- <AppMenuItem :item="item" :index="i" /> -->
            <MenuItemComponent :item="item" :index="i" />
            <!-- <AppMenuItem v-if="!item.separator" :item="item" :index="i" /> -->
            <!-- <li v-if="item.separator" class="menu-separator" /> -->
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
