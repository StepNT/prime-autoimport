<script lang="ts" setup>
const state = reactive({
    master: {
        status: [
            { id: true, text: 'Active' },
            { id: false, text: 'InActive' },
        ],
    },
    search: {
        // autoCompleteServer: '0d464588-56a6-4831-b085-f26cb65ee7fd',
        // autoCompleteMultipleServer: ['0d464588-56a6-4831-b085-f26cb65ee7fd', 'd85f5eb3-4b9c-4483-9b77-29010b0a93a3', 'dc79347f-90b2-4ffb-9140-69e54648e180'],
    } as Product,
})
</script>

<template>
    <Card>
        <template #title>
            <div class="m-2 text-xl font-semibold">
                Horizontal
            </div>
        </template>

        <template #content>
            <div row-3>
                <div input-group>
                    <label input-group-col-3>Brand</label>
                    <div input-group-col-9>
                        <InputText v-model="state.search.brand" type="text" />
                    </div>
                </div>
                <div input-group>
                    <label input-group-col-3>Title</label>
                    <div input-group-col-9>
                        <InputText v-model="state.search.title" type="text" />
                    </div>
                </div>
                <div class="input-group">
                    <label input-group-col-3>Status</label>
                    <div input-group-col-9>
                        <Select
                            v-model="state.search.status"
                            :options="state.master.status"
                            option-label="text"
                            placeholder="Select a Status"
                            :show-clear="true"
                            :filter="true"
                            :auto-filter-focus="true"
                        />
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
