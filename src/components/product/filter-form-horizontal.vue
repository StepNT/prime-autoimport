<script lang="ts" setup>
const tableRef = useTemplateRef('tableEl')

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

const func = {
    onClear() {
        state.search = {} as Product
    },
    onSearch() {
        tableRef.value!.onSearch(state.search)
    },
}
</script>

<template>
    <Card @keydown.enter="func.onSearch">
        <template #title>
            <div text-xl font-semibold>
                <Button severity="info" variant="text" rounded label="Filter">
                    <template #icon>
                        <div i-carbon:filter animate-bounce animate-duration-3s animate-count-infinite />
                    </template>
                </Button>
            </div>
        </template>

        <template #content>
            <div row-col-3>
                <div input-group>
                    <label col-3>Brand</label>
                    <InputText v-model="state.search.brand" col-9 type="text" />
                </div>
                <div input-group>
                    <label col-3>Title</label>
                    <InputText v-model="state.search.title" col-9 type="text" />
                </div>
                <div input-group>
                    <label col-3>Status</label>
                    <Select
                        v-model="state.search.status"
                        :options="state.master.status"
                        option-value="id"
                        option-label="text"
                        placeholder="Select a Status"
                        :show-clear="true"
                        filter
                        col-9
                    />
                </div>

                <div input-group>
                    <label col-3>Discount</label>
                    <InputNumber v-model="state.search.discountPercentage" col-9 />
                </div>
                <div input-group>
                    <label col-3>Start Date</label>
                    <DatePicker
                        v-model="state.search.start"
                        :select-other-months="true"
                        show-icon icon-display="input"
                        :max-date="state.search.end"
                        col-9
                    />
                </div>
                <div input-group>
                    <label col-3>End Date</label>
                    <DatePicker
                        v-model="state.search.end"
                        show-icon icon-display="input"
                        :select-other-months="true"
                        :min-date="state.search.start"
                        col-9
                    />
                </div>
            </div>
        </template>

        <template #footer>
            <div mr-2 flex justify-end gap-2>
                <Button type="button" severity="warn" label="Reset" @click="func.onClear()">
                    <template #icon>
                        <div i-carbon:renew animate-spin animate-duration-6s animate-count-infinite />
                    </template>
                </Button>
                <Button type="button" severity="info" label="Search" @click="func.onSearch()">
                    <template #icon>
                        <div i-carbon:search animate-tada animate-duration-3s animate-count-infinite />
                    </template>
                </Button>
            </div>
        </template>
    </Card>

    <ProductTable ref="tableEl" mt-4 />
</template>
