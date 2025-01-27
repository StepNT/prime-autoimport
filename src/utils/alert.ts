type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'

interface stateType {
    isOpen: boolean
    icon: string
    title: string
    subTitle: string
    severity: Severity
    url?: string
}

const state = reactive<stateType>({
    isOpen: false,
    icon: '',
    title: '',
    subTitle: '',
    severity: 'secondary',
    url: '',
})

function reset() {
    state.isOpen = false
    state.icon = ''
    state.title = ''
    state.subTitle = ''
    state.severity = 'secondary'
    state.url = ''
}

function openAlert(title: string, subTitle: string, icon: string, severity: Severity, url?: string) {
    state.isOpen = true
    state.icon = icon
    state.title = title
    state.subTitle = subTitle
    state.severity = severity
    state.url = url
}

function onClose() {
    state.isOpen = false
    reset()
}

export default {
    state,
    onClose,
}

// ===========================================
// ========== provie alert ==========
// ===========================================

interface AlertType {
    header: string
    message: string
    url?: string
}

export const _alert = {
    Info: (option: AlertType) => {
        openAlert(option.header, option.message, 'i-carbon:information', 'info', option.url)
    },
    Success: (option: AlertType) => {
        openAlert(option.header, option.message, 'i-carbon:checkmark-outline', 'success', option.url)
    },
    Warning: (option: AlertType) => {
        openAlert(option.header, option.message, 'i-carbon:warning', 'warn', option.url)
    },
    Err: (option: AlertType) => {
        openAlert(option.header, option.message, 'i-carbon:face-dissatisfied', 'danger', option.url)
    },
}
