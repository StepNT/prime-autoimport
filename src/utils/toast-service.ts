import type { ToastMessageOptions } from 'primevue'
import { ToastEventBus } from 'primevue'

function useToastService() {
    const showToast = (option: ToastMessageOptions) => {
        ToastEventBus.emit('add', { ...option })
    }

    return showToast
}

export { useToastService }
