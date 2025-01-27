<script setup lang="ts">
import MenuComponent from '@components/layout/components/menu.vue'
</script>

<template>
    <div class="layout-sidebar">
        <PerfectScrollbar class="drawer-content">
            <MenuComponent />
        </PerfectScrollbar>
    </div>
</template>

<style scoped>
.drawer-content {
    height: 100%;
    max-height: calc(100vh);
    overflow-y: auto;
}
</style>
