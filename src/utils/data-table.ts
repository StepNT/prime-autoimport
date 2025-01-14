import type { DataTablePageEvent, DataTableSortEvent } from 'primevue'

function useDataTable<TItems>(headers: DataTableHeader[], sorting: DataTableSortBy, onSubmit: Function) {
    const table = reactive<DataTableType<TItems>>({
        headers,
        props: {
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
            sortField: sorting.sortField,
            sortOrder: sorting.sortOrder === 'asc' ? 1 : -1,
        },
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
        table.props.sortField = item.sortField as string
        table.props.sortOrder = item?.sortOrder ?? -1

        onSubmit(getStatePage())
    }

    function onPageLengthChange(item: any) {
        // debugger
        // console.log('onPageLengthChange', item)
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
