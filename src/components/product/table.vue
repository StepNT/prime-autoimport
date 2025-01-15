<script lang="ts" setup>
const appStore = useAppStore()
const toast = useToast()
const confirm = useConfirm()

const state = reactive({
    search: {} as Product,
    products: [] as Product[],
    page: 0,
    totalRecords: 0 as number,
})

const { table, onSubmit, onPageChange, onSortingChange } = useDataTable<Product>(
    [
        { header: 'ID', field: 'id' },
        { header: 'Title', field: 'title' },
        { header: 'PRICE', field: 'price', sortable: true },
        { header: 'RATING', field: 'rating', sortable: true },
        { header: 'STOCK', field: 'stock' },
        { header: 'BRAND', field: 'brand' },
    ],
    {
        sortField: 'price',
        sortOrder: 'desc',
    },
    async ({ page, sort, order, pageSize }: DataTableState) => {
        const { products, total } = await api.Get<{ products: Product[], total: number }>
        (`/products/search?q=${state.search.brand ?? ''}&limit=${pageSize}&skip=${pageSize * (page)}&sortBy=${sort}&order=${order}`)

        table.result.value = products
        table.result.totalRecords = total
    },
)

function onEdit(_val: Product) {
    // modalRef.value!.open(val)
}
function onCreate() {
    // modalRef.value!.open({} as Product)
}
function onDelete(event: MouseEvent, product: Product) {
    confirm.require({
        target: event.target as HTMLElement,
        message: `Do you want to delete brand ${product.brand}?`,
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            severity: 'secondary',
            outlined: true,
        },
        acceptIcon: 'pi pi-trash',
        acceptProps: {
            severity: 'warn',
        },
        accept: () => {
            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 9000 })
        },
    })
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
    <div>
        <Card>
            <template #content>
                <DataTable
                    v-bind="{ ...table.props, ...table.result }"
                    :loading="appStore.isLoading"
                    @page="onPageChange"
                    @sort="onSortingChange"
                >
                    <!-- <Column field="id" header="ID" />
                <Column field="title" header="Title" />
                <Column field="price" header="PRICE" />
                <Column field="rating" header="RATING" />
                <Column field="stock" header="STOCK" />
                <Column field="brand" header="BRAND" /> -->

                    <Column v-for="(col, index) of table.headers" :key="`${col.field}_${index}`" v-bind="col" />

                    <template #header>
                        <div flex justify-end>
                            <Button type="button" severity="success" label="Create" @click="onCreate">
                                <template #icon>
                                    <div i-carbon:add animate-tada animate-duration-2s animate-count-infinite />
                                </template>
                            </Button>
                        </div>
                    </template>

                    <template #empty>
                        <div flex animate-head-shake animate-duration-2s animate-count-infinite justify-center>
                            ไม่พบข้อมูล
                        </div>
                    </template>

                    <!-- Edit, Delete -->
                    <Column id="action-col" header="Action" w-full flex justify-center>
                        <template #body="item">
                            <Button
                                hover="animate-tada animate-count-infinite"
                                text rounded
                                type="button"
                                severity="danger"
                                icon="i-carbon:trash-can"
                                @click="onDelete($event, item.data as Product)"
                            />

                            <Button
                                hover="animate-tada animate-count-infinite"
                                text rounded
                                icon="i-carbon:edit"
                                type="button"
                                severity="info"
                                @click="onEdit(item.data as Product)"
                            />
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
