import type { ColumnProps, DataTablePageEvent, DataTableProps, DataTableSortEvent } from 'primevue'

interface DataTableState extends DataTableProps {
    page: number
    pageCount: number
    originalEvent: Event
    first: number
    rows: number
    sortField: string | ((item: any) => string) | undefined
    sortOrder: 1 | 0 | -1 | undefined
}

interface DataTableType<TData> {
    headers: readonly ColumnProps[]
    props: DataTableState
    result: DataTableResult<TData>
}

interface DataTableResult<TData> {
    value: TData[]
    totalRecords: number
}

export interface DataTableStatePage {
    page: number
    sort: string
    order: 'asc' | 'desc'
    itemPrePage: number
}

type DataTableSortBy = Pick<DataTableSortEvent, 'sortField' | 'sortOrder'>

function useDataTable<TItems>(headers: ColumnProps[], sorting: DataTableSortBy, onSubmit: Function) {
    const table = reactive<DataTableType<TItems>>({
        headers,
        props: {
            rowsPerPageOptions: [10, 20, 30, 40, 50],
            pageLinkSize: 10,
            paginator: true,
            lazy: true,
            // page //
            page: 1,
            // itemsPerPage //
            rows: 10,
            // sorting //
            sortField: sorting.sortField,
            sortOrder: sorting.sortOrder as number | undefined,
            // result //
            value: [] as TItems[],
            totalRecords: 0,
        } as DataTableState,
        result: {
            value: [],
            totalRecords: 0,
        } as DataTableResult<TItems>,
    })

    function getStatePage() {
        return {
            page: table.props.page,
            sort: table.props.sortField,
            order: table.props.sortOrder === 1 ? 'asc' : 'desc',
            itemPrePage: table.props.rows,
        } as DataTableStatePage
    }

    function onPageChange(item: DataTablePageEvent) {
        table.props.page = item.page
        table.props.pageCount = item.pageCount

        onSubmit(getStatePage())
    }

    function onSortByChange(item: DataTableSortEvent) {
        table.props.sortField = item.sortField
        table.props.sortOrder = item?.sortOrder ?? -1

        onSubmit(getStatePage())
    }

    function onPageLengthChange(item: any) {
        debugger
        console.log('onPageLengthChange', item)
        table.props.rows = item.rows

        onSubmit(getStatePage())
    }

    function functionOnSubmit() {
        table.props.first = 0
        table.props.page = 0

        onSubmit(getStatePage())
    }

    return {
        table,
        onSubmit: functionOnSubmit,
        onPageChange,
        onSortByChange,
        onPageLengthChange,
    }
}

export { useDataTable }
