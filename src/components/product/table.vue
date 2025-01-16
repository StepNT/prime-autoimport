<script lang="ts" setup>
const toast = useToast()
const confirm = useConfirm()

const modalRef = useTemplateRef('modalEl')

const state = reactive({ search: {} as Product })

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

function onEdit(product: Product) {
    modalRef.value!.onOpen(product)
}
function onCreate() {
    modalRef.value!.onOpen({} as Product)
}
function onDelete(event: MouseEvent, product: Product) {
    confirm.require({
        target: event.target as HTMLElement,
        group: 'popup-el',
        header: 'Confirmation',
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
            toast.add({
                severity: 'success',
                summary: 'Confirmed',
                detail: 'You have accepted',
                life: 9000,
            })
        },
    })
}

onMounted(() => onSubmit())

defineExpose({
    onSearch(search: Product) {
        state.search = { ...search }
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
                                    <div i-carbon:add animate-btn />
                                </template>
                            </Button>
                        </div>
                    </template>

                    <template #empty>
                        ไม่พบข้อมูล
                    </template>

                    <!-- Edit, Delete -->
                    <Column id="action-col" header="Action" w-full flex justify-center>
                        <template #body="item">
                            <Button
                                hover="animate-btn-action"
                                text rounded
                                type="button"
                                severity="danger"
                                icon="i-carbon:trash-can"
                                @click="onDelete($event, item.data as Product)"
                            />

                            <Button
                                hover="animate-btn-action"
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

        <ProductModal ref="modalEl" />
    </div>
</template>
