<script lang="ts" setup>
const appStore = useAppStore()

const state = reactive({
    search: {} as Product,
    products: [] as Product[],
    page: 0,
    totalRecords: 0 as number,
})

// const { table, onSubmit, onPageChange, onSortChange, Options } = useDataTable<Product>(
//     [
//         { title: 'ID', key: 'id', sortable: true },
//         { title: 'Title', key: 'title' },
//         { title: 'PRICE', key: 'price' },
//         { title: 'RATING', key: 'rating', sortable: true },
//         { title: 'STOCK', key: 'stock' },
//         { title: 'BRAND', key: 'brand' },
//     ],
//     [
//         { sortField: 'rating', sortOrder: 'asc' },
//     ],
//     async () => {
//         console.log(table.options.sortBy[0])
//         const res = await api.Get<{ products: Product[], total: number }>(`https://dummyjson.com/products?limit=10&skip=${table.options.page}`)
//         table.result.items = res.products
//         table.result.itemsLength = res.total
//     },
// )

const tablex = reactive({
    headers: [
        { header: 'ID', field: 'id', key: 'id', sortable: true },
        { header: 'Title', field: 'title' },
        { header: 'PRICE', field: 'price' },
        { header: 'RATING', field: 'rating', sortable: true },
        { header: 'STOCK', field: 'stock' },
        { header: 'BRAND', field: 'brand' },
    ],
    options: {
        page: 0,
        // sortBy: [
        //     { sortField: 'rating', sortOrder: 'asc' },
        // ],
    },
    result: {
        items: [] as Product[],
        itemsLength: 0 as number,
    },
})

async function onSubmit() {
    const res = await api.Get<{ products: Product[], total: number }>(`https://dummyjson.com/products?limit=10&skip=${tablex.options.page}`)
    tablex.result.items = res.products
    tablex.result.itemsLength = res.total
}

const func = {
    onEdit: (val: Product) => {
        // modalRef.value!.open(val)
        console.log(val)
    },
    onCreate: () => {
        // modalRef.value!.open({} as Product)
    },
    onDelete: (val: Product) => {
        console.log(val)
    },
}

onMounted(async () => {
    await onSubmit()
})

defineExpose({
    onSearch: async (productSearch: Product) => {
        state.search = { ...productSearch }
        onSubmit()
    },
})
</script>

<template>
    <Card>
        <template #content>
            <DataTable
                sort-field="rating"
                :sort-order="1"
                :loading="appStore.isLoading"
                lazy paginator
                :rows="10"
                :rows-per-page-options="[10, 20, 30, 40, 50]"
                :page-link-size="10"
                :value="tablex.result.items"
                :total-records="tablex.result.itemsLength"
            >
                <Column v-for="(col, index) of tablex.headers" :key="`${col.field}_${index}`" v-bind="col" />

                <template #header>
                    <div class="flex justify-end">
                        <Button
                            type="button" icon="i-carbon:add"
                            severity="success"
                            label="Create"
                            @click="func.onCreate"
                        />
                    </div>
                </template>

                <template #empty>
                    Data Not Found
                </template>

                <template #loading>
                    Loading...
                </template>

                <!-- Edit, Delete -->
                <Column id="action-col" header="Action" style="width: 100px" header-class="flex justify-center">
                    <template #body="slotProps">
                        <div class="align-items-center text-info flex gap-1">
                            <Button
                                text rounded
                                type="button"
                                severity="danger"
                                icon="i-carbon:trash-can"
                                @click="func.onDelete(slotProps.data as Product)"
                            />

                            <Button
                                text rounded
                                type="button"
                                severity="info"
                                icon="i-carbon:edit"
                                @click="func.onEdit(slotProps.data as Product)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
