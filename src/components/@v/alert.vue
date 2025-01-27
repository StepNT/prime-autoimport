<script lang="ts" setup>
import store from '../../utils/alert'

const color = computed(() => {
    if (store.state.severity === 'info')
        return 'text-color-blue-500'
    if (store.state.severity === 'success')
        return 'text-color-green-500'
    if (store.state.severity === 'warn')
        return 'text-color-yellow-500'

    return 'text-color-red-500'
})
</script>

<template>
    <ConfirmDialog v-model:visible="store.state.isOpen">
        <template #container>
            <div class="min-w-100 flex flex-col rounded p-8">
                <div class="flex items-center justify-center rounded-full">
                    <i
                        :class="[store.state.icon, color]"
                        animate-tada animate-duration-2s animate-count-infinite
                        :style="{ width: '6rem !important', height: '6rem !important' }"
                    />
                </div>
                <span class="mt-4 flex justify-center text-2xl font-bold">
                    {{ store.state.title }}
                </span>

                <span mt-3 flex justify-center>
                    {{ store.state.subTitle }}
                </span>

                <span v-if="store.state.url" mt-3 flex justify-center>
                    {{ store.state.url }}
                </span>
                <div class="mt-6 w-full flex items-center gap-2">
                    <Button label="Close" :severity="store.state.severity" variant="outlined" w-full @click="store.onClose()" />
                </div>
            </div>
        </template>
    </ConfirmDialog>
</template>
