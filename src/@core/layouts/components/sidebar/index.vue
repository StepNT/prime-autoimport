<script setup lang="ts">
import LayoutsSidebarNavItem from './item.vue'
// import LayoutsSidebarNavCollapse from './collapse.vue'
import LayoutsSidebarNavGroup from './group.vue'
import Logo from '@/@core/layouts/components/logo.vue'

const layoutStore = useLayoutStore()
const { Menus } = useMenuStore()
</script>

<template>
    <v-navigation-drawer
        v-model="layoutStore.state.drawer"
        left
        elevation="0"
        rail-width="90"
        mobile-breakpoint="lg"
        width="279"
        app
        class="leftSidebar"
        :rail="!layoutStore.state.rail"
        expand-on-hover
    >
        <!--- Logo part -->
        <div pa3>
            <Logo />
        </div>

        <!-- ---------------------------------------------- -->
        <!--- Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <v-list aria-busy="true" class="px-2" aria-label="menu list">
                <!--- Menu Loop -->
                <template v-for="(item, i) in Menus()" :key="`${i}-${item.header}`">
                    <!--- Item Sub Header -->
                    <LayoutsSidebarNavGroup :item="item" />

                    <!--- Item Divider -->
                    <!-- <v-divider v-else-if="item.divider" class="my-3" /> -->
                    <!--- If Has Child -->
                    <!-- <LayoutsSidebarNavCollapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" /> -->

                    <!--- Single Item -->
                    <LayoutsSidebarNavItem v-for="navItem in item.children" :key="navItem.to" :item="navItem" />

                <!--- End Single Item -->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
