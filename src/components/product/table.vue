<script lang="ts" setup>
import type { DataTableStatePage } from '@/types/common/data-table'

const appStore = useAppStore()

const state = reactive({
    search: {} as Product,
    products: [] as Product[],
    page: 0,
    totalRecords: 0 as number,
})
const { table, onSubmit, onPageChange, onSortByChange } = useDataTable<Product>(
    [
        { header: 'ID', field: 'id', sortable: true },
        { header: 'Title', field: 'title' },
        { header: 'PRICE', field: 'price' },
        { header: 'RATING', field: 'rating', sortable: true },
        { header: 'STOCK', field: 'stock' },
        { header: 'BRAND', field: 'brand' },
    ],
    {
        sortField: 'rating',
        sortOrder: 'asc',
    },
    async ({ page, sort, order, itemPrePage }: DataTableStatePage) => {
        const { products, total } = await api.Get<{ products: Product[], total: number }>
        (`/products/search?q=${state.search.brand ?? ''}&limit=${itemPrePage}&skip=${itemPrePage * (page)}&sortBy=${sort}&order=${order}`)

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
                @sort="onSortByChange"
            >
                <Column v-for="(col, index) of table.headers" :key="`${col.field}_${index}`" v-bind="col" />

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
