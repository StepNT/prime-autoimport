<script lang="ts" setup>
const app = useAppStore()
</script>

<template>
    <Dialog v-model:visible="app.isLoading" modal class="v-loading" pt:mask:class="backdrop-blur-sm">
        <template #container>
            <div class="flex flex-col items-center justify-center">
                <ProgressSpinner
                    style="width: 4rem; height: 4rem" stroke-width="3" fill="transparent"
                    animation-duration="1s" aria-label="Custom ProgressSpinner"
                />
                <div text-md mt-3 animate-bounce text-gray-500 font-500>
                    Loading...
                </div>
            </div>
        </template>
    </Dialog>
</template>
