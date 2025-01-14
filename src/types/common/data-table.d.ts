
interface DataTableProp  { 
    rowsPerPageOptions: number[] 
    paginator: boolean
    lazy: boolean
    page: number
    pageCount: number
    originalEvent: Event
    first: number
    rows: number
    sortField: string 
    sortOrder: -1|0|1
}

interface DataTableHeader {
    header: string
    field: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
}

interface DataTable<TData> {
    headers: DataTableHeader[]
    props: DataTableProp
    result: DataTableResult<TData>
}

interface DataTableResult<TData> {
    value: TData[]
    totalRecords: number
}

interface DataTableState {
    page: number
    sort: string
    order: 'asc' | 'desc'
    itemPrePage: number
}

interface DataTableSortBy {
    sortField: string
    sortOrder: 'asc' | 'desc'
}


