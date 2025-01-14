<script lang="ts" setup>
const appStore = useAppStore()

const state = reactive({
    search: {} as Product,
    products: [] as Product[],
    page: 0,
    totalRecords: 0 as number,
})

const { table, onSubmit, onPageChange, onSortingChange } = useDataTable<Product>(
    [
        { header: 'ID', field: 'id', sortable: true },
        { header: 'Title', field: 'title' },
        { header: 'PRICE', field: 'price', sortable: true },
        { header: 'RATING', field: 'rating', sortable: true },
        { header: 'STOCK', field: 'stock' },
        { header: 'BRAND', field: 'brand' },
    ],
    {
        sortField: 'rating',
        sortOrder: 'asc',
    },
    async ({ page, sort, order, pageSize }: DataTableState) => {
        const { products, total } = await api.Get<{ products: Product[], total: number }>
        (`/products/search?q=${state.search.brand ?? ''}&limit=${pageSize}&skip=${pageSize * (page)}&sortBy=${sort}&order=${order}`)

        table.result.value = products
        table.result.totalRecords = total
    },
)

const func = {
    onEdit(_val: Product) {
        // modalRef.value!.open(val)
    },
    onCreate() {
        // modalRef.value!.open({} as Product)
    },
    onDelete(_val: Product) {
    },
}

onMounted(() => onSubmit())

defineExpose({
    onSearch(productSearch: Product) {
        state.search = { ...productSearch }
        onSubmit()
    },
})
</script>

<template>
    <Card>
        <template #content>
            <DataTable
                v-bind="{ ...table.props, ...table.result }"
                :loading="appStore.isLoading"
                @page="onPageChange"
                @sort="onSortingChange"
            >
                <Column v-for="(col, index) of table.headers" :key="`${col.field}_${index}`" v-bind="col" />

                <template #header>
                    <div flex justify-end>
                        <Button type="button" icon="i-carbon:add" severity="success" label="Create" @click="func.onCreate" />
                    </div>
                </template>

                <template #empty>
                    Data Not Found
                </template>

                <template #loading>
                    Loading...
                </template>

                <!-- Edit, Delete -->
                <Column id="action-col" header="Action" w-full flex justify-center>
                    <template #body="item">
                        <Button
                            text rounded
                            type="button"
                            severity="danger"
                            icon="i-carbon:trash-can"
                            @click="func.onDelete(item.data as Product)"
                        />

                        <Button
                            text rounded
                            type="button"
                            severity="info"
                            icon="i-carbon:edit"
                            @click="func.onEdit(item.data as Product)"
                        />
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
