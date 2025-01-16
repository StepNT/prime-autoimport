// import type { ConfirmationOptions } from 'primevue/confirmationoptions'
// import { DynamicDialogEventBus } from 'primevue'

import type { ConfirmationServiceMethods } from 'primevue'
// import { ConfirmationOptions } from 'primevue/confirmationoptions'

// function useConfirmService() {
//     const showToast = (option: ConfirmationOptions) => {
//         DynamicDialogEventBus.emit('require', { ...option })
//     }

//     return showToast
// }

// export { useConfirmService }

// import type { ToastServiceMethods } from 'primevue/usetoast'

export function showError(confirm: ConfirmationServiceMethods, message: string) {
    confirm.require({
        message,
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            severity: 'secondary',
            outlined: true,
        },
        acceptProps: {
            severity: 'warn',
        },
    })
}

// export function showSuccess(toast: ConfirmationServiceMethods, message: string) {
//     toast.add({
//         severity: 'success',
//         summary: 'Success',
//         detail: message,
//     })
// }
