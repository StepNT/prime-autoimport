<script lang="ts" setup>
const { isLoading } = storeToRefs(useAppStore())
const toast = useToast()
// const confirm = useConfirm()

const state = reactive({
    product: {} as Product,
    isOpen: false,
})

function onAction() {
    (state.product.id) ? Update() : Create()
}

async function Create() {
    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'created successfully',
        life: 6000,
    })

    state.isOpen = false
}

async function Update() {
    const update = _pick(state.product, ['id', 'title'])
    await api.Put(`/products/${state.product.id}`, { update })

    toast.add({
        severity: 'success',
        summary: 'Updated',
        detail: `update brand: ${state.product.brand}? successfull`,
        life: 6000,
    })

    state.isOpen = false

    // example confirm
    // confirm.require({
    //     header: 'Update',
    //     message: `Do you want to update brand: ${state.product.brand}?`,
    //     rejectProps: {
    //         label: 'Cancel',
    //         severity: 'secondary',
    //         outlined: true,
    //     },
    //     rejectIcon: 'i-carbon:close',
    //     acceptIcon: 'i-carbon:save',
    //     accept: () => {
    //         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
    //     },
    // })
}

function onOpen(product: Product) {
    state.product = { ...product }
    state.isOpen = true
}

function onClose() {
    state.isOpen = false
    state.product = {} as Product
}

const btnColor = computed(() => state.product.brand ? 'info' : 'success')

defineExpose({
    onOpen,
    onClose,
})
</script>

<template>
    <div>
        <!-- <ConfirmDialog /> -->

        <Dialog v-model:visible="state.isOpen" modal header="Edit Profile" w-screen-lg>
            <template #header>
                <Button :severity="btnColor" rounded variant="text" :label=" state.product.id ? 'Update' : 'Create' ">
                    <template #icon>
                        <div :class="state?.product?.id ? 'i-carbon:edit' : 'i-carbon:add'" animate-header />
                    </template>
                </Button>
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
                    <Button type="button" label="Cancel" severity="secondary" @click="onClose()">
                        <template #icon>
                            <div i-carbon:close-outline animate-btn />
                        </template>
                    </Button>
                    <Button type="button" label="Save" :severity="btnColor" :loading="isLoading" @click="onAction()">
                        <template #icon>
                            <div i-carbon:save animate-btn />
                        </template>
                    </Button>
                </div>
            </template>
        </Dialog>
    </div>
</template>
