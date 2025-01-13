interface DataTableOption {
    page: number
    itemsPerPage: number
    sortBy: DataTableSortBy[]
}

interface DataTableSortBy {
    key: string
    order?: boolean | 'asc' | 'desc'
}

interface DataTableHeader {
    title: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
    key: string
}

interface DataTableResult<TData> {
    items: TData[]
    itemsLength: number
}

interface DataTable<TData> {
    headers: readonly DataTableHeader[]
    options: DataTableOption
    result: DataTableResult<TData>
}

function useDataTable<TItems>(headers: DataTableHeader[], sortBy: DataTableSortBy[], onSubmit: Function) {
    const table = reactive({
        headers,
        options: {
            page: 1,
            itemsPerPage: 20,
            sortBy,
        },
        result: {
            items: [],
            itemsLength: 0,
        },
    } as DataTable<TItems>)

    function onPageChange(page: number) {
        table.options.page = page
        onSubmit({ page })
    }

    function onSortByChange(sortBy: any) {
        table.options.sortBy = sortBy
        onSubmit({ sortBy })
    }

    function onPageLengthChange(itemsPerPage: number) {
        table.options.itemsPerPage = itemsPerPage
        onSubmit({ itemsPerPage })
    }

    function functionOnSubmit({ page } = { page: 1 }) {
        table.options.page = page
        onSubmit({ page })
    }

    function Options() {
        return {
            rows: 10,
            rowsPerPageOptions: [10, 20, 30, 40, 50],
            pageLinkSize: 10,
        }
    }

    return {
        table,
        onSubmit: functionOnSubmit,
        onPageChange,
        onSortByChange,
        onPageLengthChange,
        // option
        Options,
    }
}

export { useDataTable }
