export interface Prop {
    rowsPerPageOptions: number[]
    paginator: boolean
    lazy: boolean
    page: number
    pageCount: number
    originalEvent: Event
    first: number
    rows: number
    sortField: string
    sortOrder: -1 | 0 | 1
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
    sortField: string
    sortOrder: 'asc' | 'desc'
}

export {}
declare global {

    interface DataTableState {
        page: number
        sort: string
        order: 'asc' | 'desc'
        itemPrePage: number
    }

}
