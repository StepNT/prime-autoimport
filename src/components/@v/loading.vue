<script lang="ts" setup>
const visible = ref(true)
</script>

<template>
    <Dialog v-model:visible="visible" class="v-loading" pt:mask:class="backdrop-blur-sm">
        <template #container>
            <div class="flex flex-col items-center justify-center">
                <ProgressSpinner
                    style="width: 4rem; height: 4rem" stroke-width="3" fill="transparent"
                    animation-duration="1s" aria-label="Custom ProgressSpinner"
                />
                <div class="text-md mt-2">
                    Loading...
                </div>
            </div>
        </template>
    </Dialog>
</template>
