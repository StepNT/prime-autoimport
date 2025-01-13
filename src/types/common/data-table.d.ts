// interface DataTableOption {
//     page: number
//     itemsPerPage: number
//     sortBy: DataTableSortBy[]
// }

// interface DataTableSortBy {
//     key: string
//     order?: boolean | 'asc' | 'desc'
// }

// interface DataTableHeader {
//     title: string
//     align?: 'start' | 'center' | 'end'
//     sortable?: false | true
//     key: string
// }

// interface DataTableResult<TDatas> {
//     items: TDatas[]
//     itemsLength: number
// }

// interface DataTableType<TDatas> {
//     headers: readonly DataTableHeader[]
//     options: DataTableOption
//     result: DataTableResult<TDatas>
// }



export const DataTableOption = {
    rows: 10,
    rowsPerPageOptions: [10, 20, 30, 40, 50],
    pageLinkSize: 10,
}

