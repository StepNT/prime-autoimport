<script lang="ts" setup>

</script>

<template>
    <Card>
        <template #title>
            <div class="m-2 text-xl font-semibold">
                Horizontal
            </div>
        </template>

        <template #content>
            <div class="grid gap-4 md:grid-cols-3 sm:flex-row">
                <div class="input-group">
                    <label class="col-span-12 md:col-span-3">Brand</label>
                    <div class="col-span-12 md:col-span-9">
                        <InputText type="text" w-full />
                    </div>
                </div>
                <div class="input-group">
                    <label class="col-span-12 md:col-span-3">Brand</label>
                    <div class="col-span-12 md:col-span-9">
                        <InputText type="text" w-full />
                    </div>
                </div>
                <div class="input-group">
                    <label class="col-span-12 md:col-span-3">Brand</label>
                    <div class="col-span-12 md:col-span-9">
                        <InputText type="text" w-full />
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
