<script lang="ts" setup>
const { isLoading } = storeToRefs(useAppStore())
const toast = useToast()
const confirm = useConfirm()

const state = reactive({
    product: {} as Product,
    isOpen: false,
})

async function onAction() {
    if (state.product.id) {
        Update()
    }
    else {
        await Create()
    }
}

async function Create() {
    // _notify.Success('Product created successfully')
    state.isOpen = false
}

function Update() {
    // confirm.require({
    //     message: `Do you want to update brand: ${state.product.brand}?`,
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: async () => {
    //         const update = _pick(state.product, ['id', 'title'])
    //         await api.Put(`/products/${state.product.id}`, { update })

    //         toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 9000 })
    //         state.isOpen = false
    //     },
    // })

    confirm.require({
        header: 'Update',
        message: `Do you want to update brand: ${state.product.brand}?`,
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptProps: {
            label: 'Save',
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
        },
    })
}

function onOpen(product: Product) {
    state.product = { ...product }
    state.isOpen = true
}

function onClose() {
    state.isOpen = false
    state.product = {} as Product
}

defineExpose({
    onOpen,
    onClose,
})
</script>

<template>
    <div>
        <ConfirmDialog />

        <Dialog v-model:visible="state.isOpen" modal header="Edit Profile" w-screen-lg>
            <template #header>
                <div text-xl font-semibold>
                    <Button severity="info" variant="text" rounded :label=" state.product.id ? 'Update' : 'Create' ">
                        <template #icon>
                            <div :class="state?.product?.id ? 'i-carbon:edit' : 'i-carbon:add'" animate-icon animate-bounce />
                        </template>
                    </Button>
                </div>
            </template>

            <template #default>
                <div row-col-3>
                    <div input-col>
                        <label>Brand</label>
                        <InputText v-model="state.product.brand" type="text" />
                    </div>
                    <div input-col>
                        <label>Title</label>
                        <InputText v-model="state.product.title" type="text" />
                    </div>
                    <div input-col>
                        <label>Stock</label>
                        <InputNumber v-model="state.product.stock" />
                    </div>

                    <div input-col>
                        <label>Rating</label>
                        <InputNumber v-model="state.product.rating" />
                    </div>
                    <div input-col>
                        <label>Price</label>
                        <InputNumber v-model="state.product.price" />
                    </div>
                    <div input-col>
                        <label>Discount</label>
                        <InputNumber v-model="state.product.discountPercentage" />
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="onClose()" />
                    <Button type="button" label="Save" :loading="isLoading" @click="onAction()" />
                </div>
            </template>
        </Dialog>
    </div>
</template>
