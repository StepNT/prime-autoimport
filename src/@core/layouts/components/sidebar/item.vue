<script setup lang="ts">
defineProps<{ item: MenuChildren, level?: number }>()
</script>

<template>
    <v-list-item
        :to="item.to"
        density="compact"
        rounded="lg" color="primary" :prepend-icon="item.icon"
    >
        <v-list-item-title>
            {{ item.label }}
        </v-list-item-title>
    </v-list-item>
</template>
