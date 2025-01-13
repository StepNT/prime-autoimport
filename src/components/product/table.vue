<script lang="ts" setup>
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue'

const state = reactive({
    search: {} as Product,
    products: [] as Product[],
    page: 0,
    totalRecords: 0 as number,
})

const { table, onSubmit, Options } = useDataTable<Product>(
    [
        { title: 'ID', key: 'id', sortable: true },
        { title: 'Title', key: 'title' },
        { title: 'PRICE', key: 'price' },
        { title: 'RATING', key: 'rating' },
        { title: 'STOCK', key: 'stock' },
        { title: 'BRAND', key: 'brand' },
    ],
    [
        { key: 'id', order: 'asc' },
    ],
    async () => {
        const { products, total } = await api.Get<{ products: Product[], total: number }>(`https://dummyjson.com/products?limit=10&skip=${table.options.page}`)
        table.result.items = products
        table.result.itemsLength = total
    },
)

const func = {
    onPage: (event: DataTablePageEvent) => {
        state.page = event.first ?? 0
        onSubmit()
    },
    onSort: (event: DataTableSortEvent) => {
        state.page = event.first ?? 0
        onSubmit()
    },
    onEdit: (_val: Product) => {
        // modalRef.value!.open(val)
    },
    onCreate: () => {
        // modalRef.value!.open({} as Product)
    },
    onDelete: (_event: Event, _product: Product) => {
    },
}
onMounted(() => {
    onSubmit()
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
                lazy paginator
                data-key="id"
                v-bind="Options"
                :value="table.result.items"
                :total-records="table.result.itemsLength"
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
                    v-for="col of table.headers"
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
