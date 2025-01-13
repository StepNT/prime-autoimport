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
        { title: 'ID', key: 'id', sortable: true },
        { title: 'Title', key: 'title' },
        { title: 'PRICE', key: 'price' },
        { title: 'RATING', key: 'rating', sortable: true },
        { title: 'STOCK', key: 'stock' },
        { title: 'BRAND', key: 'brand' },
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
    onEdit: (_val: Product) => {
        // modalRef.value!.open(val)
    },
    onCreate: () => {
        // modalRef.value!.open({} as Product)
    },
    onDelete: (_event: Event, _product: Product) => {
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

                <Column
                    v-for="col of tablex.headers"
                    :key="col.key"
                    :field="col.key"
                    :header="col.title"
                    :sortable="col.sortable"
                />

                <!-- Edit, Delete -->
                <Column id="action-col" header="Action" style="width: 100px" header-class="flex justify-center">
                    <template #body="slotProps">
                        <div class="align-items-center text-info flex gap-1">
                            <Button
                                text rounded type="button"
                                severity="danger"
                                icon="pi pi-trash"
                                @click="func.onDelete($event, slotProps.data as Product)"
                            />

                            <Button
                                text rounded type="button"
                                severity="info"
                                icon="pi pi-pencil"
                                @click="func.onEdit(slotProps.data as Product)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
