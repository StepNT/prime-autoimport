<script setup lang="ts">
const { VITE_IMAGE_BASE_URL } = useEnv()
</script>

<template>
    <div class="logo">
        <RouterLink to="/" aria-label="logo">
            <v-img :src="VITE_IMAGE_BASE_URL" alt="logo" max-width="600px" rounded="md" />
        </RouterLink>
    </div>
</template>
