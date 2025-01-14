import type { DataTablePageEvent, DataTableSortEvent } from 'primevue'

export interface Prop {
    stripedRows: boolean
    rowsPerPageOptions: number[]
    paginator: boolean
    lazy: boolean
    page: number
    pageCount: number
    originalEvent: Event
    first: number
    rows: number
    sortField?: string
    sortOrder?: -1 | 0 | 1
}

export interface Header {
    header: string
    field: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
}

export interface DataTable<TData> {
    headers: Header[]
    props: Prop
    result: Result<TData>
}

export interface Result<TData> {
    value: TData[]
    totalRecords: number
}

export interface Sorting {
    sortField?: string
    sortOrder?: 'asc' | 'desc'
}

export {}
declare global {

    interface DataTableState {
        page: number
        sort?: string
        order?: 'asc' | 'desc'
        pageSize: number
    }

}

function useDataTable<TItems>(headers: Header[], sorting?: Sorting, onSubmit?: Function) {
    const table = reactive<DataTable<TItems>>({
        headers,
        props: {
            stripedRows: true,
            rowsPerPageOptions: [10, 20, 30, 40, 50],
            paginator: true,
            lazy: true,
            // page //
            originalEvent: {} as Event,
            first: 0,
            page: 1,
            pageCount: 0,
            // itemsPerPage //
            rows: 10,
            // sorting //
            sortField: sorting?.sortField,
            sortOrder: sorting?.sortOrder === 'asc' ? 1 : -1,
        },
        result: {
            value: [],
            totalRecords: 0,
        } as Result<TItems>,
    })

    function getStatePage() {
        return {
            page: table.props.page,
            sort: table.props?.sortField,
            order: table.props?.sortOrder === 1 ? 'asc' : 'desc',
            pageSize: table.props.rows,
        } as DataTableState
    }

    function onPageChange(item: DataTablePageEvent) {
        table.props.page = item.page
        table.props.pageCount = item.pageCount

        onSubmit!(getStatePage())
    }

    function onSortingChange(item: DataTableSortEvent) {
        table.props.sortField = item.sortField as string
        table.props.sortOrder = item?.sortOrder ?? -1

        onSubmit!(getStatePage())
    }

    function functionOnSubmit() {
        table.props.first = 0
        table.props.page = 0

        onSubmit!(getStatePage())
    }

    return {
        table,
        onSubmit: functionOnSubmit,
        onPageChange,
        onSortingChange,
    }
}

export { useDataTable }
