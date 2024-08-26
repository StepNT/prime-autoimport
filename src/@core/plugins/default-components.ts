const vBtn = {
    variant: 'flat',
    class: 'text-none pr-4 pl-4 font-bold',
    rounded: 'lg',
}

const vSelect = {
    clearable: true,
    variant: 'outlined',
    density: 'compact',
    color: 'primary',
    hideDetails: 'auto',
    // dirty: true,
    itemTitle: 'text',
    itemValue: 'id',
}

const vNumber = {
    clearable: true,
    density: 'compact',
    color: 'primary',
    variant: 'outlined',
    hideDetails: 'auto',
    // dirty: true,
}

const vDate = {
    clearable: true,
    density: 'compact',
    color: 'primary',
    // dirty: true,
    variant: 'outlined',
    placeholder: '',
    prependIcon: '',
    appendInnerIcon: 'mdi-calendar',
    hideActions: 'true',
    hideDetails: 'auto',
}

const vChip = {
    label: true,
    rounded: 'lg',
    density: 'compact',
    // size: 'default',
    elevation: 0,
    class: 'pa-4',
}
export default {
    VContainer: {
        fluid: true,
    },
    VBtn: vBtn,
    VCard: {
        rounded: 'md',
        variant: 'outlined',
        elevation: 0,
        class: 'bg-surface',
        VBtn: vBtn,
        VDateInput: vDate,
        VCardTitle: {
            // class: 'mr-4 ml-4 mt-1 mb-1',
            VChip: vChip,
        },
        VCardText: {
            // VRow: {
            //     class: 'mr-4 mb-0 mt-0 mb-0',
            // },
            // class: 'mr-4 ml-4',
            VSelect: vSelect,
            VNumberInput: vNumber,
        },
        VCardActions: {
            // class: 'mr-4 ml-4 mb-2',
            VBtn: vBtn,
        },
    },
    VTextField: {
        clearable: true,
        hideDetails: 'auto',
        density: 'compact',
        color: 'primary',
        // dirty: true,
        variant: 'outlined',
    },
    VAutocomplete: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VCombobox: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VFileInput: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VTextarea: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VSwitch: {
        color: 'primary',
        hideDetails: 'auto',
    },
    VDataTableServer: {
        color: 'primary',
        density: 'comfortable',
        hover: true,
        VSelect: {
            clearable: false,
            variant: 'underlined',
            density: 'compact',
            itemTitle: 'title',
            itemValue: 'value',
        },
    },
    VCheckbox: {
        color: 'primary',
        density: 'compact',
        hideDetails: 'auto',
    },
    VRadioGroup: {
        color: 'primary',
        density: 'compact',
        hideDetails: 'auto',
    },
    VRadio: {
        density: 'compact',
        hideDetails: 'auto',
    },
    VTabs: {
        color: 'primary',
    },
    VChip: vChip,
    VNumber: vNumber,
}
