<script lang="ts" setup>
const appStore = useAppStore()
const toast = useToast()
const confirm = useConfirm()
const visible = ref(false)

const state = reactive({
    search: {} as Product,
    products: [] as Product[],
    page: 0,
    totalRecords: 0 as number,
})

const state2 = reactive({
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
    visible.value = true
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

        <Dialog v-model:visible="visible" modal header="Edit Profile" w-screen-lg>
            <template #default>
                <div row-col-3>
                    <div input-group-full>
                        <label>Brand</label>
                        <InputText v-model="state.search.brand" type="text" />
                    </div>
                    <div input-group-full>
                        <label>Title</label>
                        <InputText v-model="state.search.title" type="text" />
                    </div>
                    <div input-group-full>
                        <label>Status</label>
                        <Select
                            v-model="state2.search.status"
                            :options="state2.master.status"
                            option-value="id"
                            option-label="text"
                            placeholder="Select a Status"
                            :show-clear="true"
                            filter
                        />
                    </div>

                    <div input-group-full>
                        <label>Discount</label>
                        <InputNumber v-model="state2.search.discountPercentage" />
                    </div>
                    <div input-group-full>
                        <label>Start Date</label>
                        <DatePicker
                            v-model="state2.search.start"
                            :select-other-months="true"
                            show-icon icon-display="input"
                            :max-date="state2.search.end"
                        />
                    </div>
                    <div input-group-full>
                        <label>End Date</label>
                        <DatePicker
                            v-model="state2.search.end"
                            show-icon icon-display="input"
                            :select-other-months="true"
                            :min-date="state2.search.start"
                        />
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="mr-2 flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false" />
                    <Button type="button" label="Save" @click="visible = false" />
                </div>
            </template>
        </Dialog>
    </div>
</template>
