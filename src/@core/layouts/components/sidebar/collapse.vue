<script setup lang="ts">
// import NavItem from '../NavItem/NavItem.vue'
// import SvgSprite from '@/components/shared/SvgSprite.vue'

const { item, level } = defineProps({ item: Object, level: Number })
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!--- Item Children -->
    <!-- ---------------------------------------------- -->
    <v-list-group no-action>
        <!-- ---------------------------------------------- -->
        <!--- Dropdown  -->
        <!-- ---------------------------------------------- -->
        <template #activator="{ props }">
            <v-list-item v-bind="props" :value="item?.title" rounded color="primary">
                <!--- Icon  -->
                <template #prepend>
                    <v-icon v-if="item?.icon">
                        {{ item?.icon }}
                    </v-icon>
                </template>
                <!--- Title  -->
                <v-list-item-title class="mr-auto">
                    {{ item?.title }}
                </v-list-item-title>
                <!--- If Caption -->
                <v-list-item-subtitle v-if="item?.subCaption" class="text-caption hide-menu mt-0">
                    {{ item?.subCaption }}
                </v-list-item-subtitle>
            </v-list-item>
        </template>
        <!-- ---------------------------------------------- -->
        <!--- Sub Item -->
        <!-- ---------------------------------------------- -->
        <template v-for="(subitem, i) in item?.children" :key="i">
            <NavCollapse v-if="subitem.children" :item="subitem" :level="(level ?? 0) + 1" />
            <LayoutsSidebarNavItem v-else :item="subitem" :level="(level ?? 0) + 1" />
        </template>
    </v-list-group>

    <!-- ---------------------------------------------- -->
    <!--- End Item Sub Header -->
    <!-- ---------------------------------------------- -->
</template>
