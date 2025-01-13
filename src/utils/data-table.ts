import type { DataTablePageEvent, DataTableSortEvent } from 'primevue'

interface DataTableOption {
    page: DataTablePageEvent
    itemsPerPage: number
    sortBy: DataTableSortEvent
}

// interface DataTableSortBy {
//     sortField: string
//     sortOrder?: 'asc' | 'desc'
// }

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
// function useDataTable<TItems>(headers: DataTableHeader[], sortBy: DataTableSortBy[], onSubmit: Function) {
function useDataTable<TItems>(headers: DataTableHeader[], sortBy: DataTableSortEvent, onSubmit: Function) {
    const table = reactive({
        headers,
        options: {
            page: {} as DataTablePageEvent,
            itemsPerPage: 20,
            sortBy,
        },
        result: {
            items: [],
            itemsLength: 0,
        },
    } as DataTable<TItems>)

    function onPageChange(item: DataTablePageEvent) {
        // const page = item.page + 1
        table.options.page = item
        onSubmit()
    }

    function onSortChange(item: DataTableSortEvent) {
        table.options.sortBy = item
        onSubmit({ sortBy })
    }

    function onPageLengthChange(itemsPerPage: any) {
        table.options.itemsPerPage = itemsPerPage
        onSubmit()
    }

    function functionOnSubmit() {
        // table.options.page = { ...table.options.page, page: page ?? table.options.page.page }
        onSubmit()
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
        onSortChange,
        onPageLengthChange,
        // option
        Options,
    }
}

export { useDataTable }
