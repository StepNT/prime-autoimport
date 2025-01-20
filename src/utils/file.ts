import * as XLSX from 'xlsx'

// Function to parse Excel file and return JSON data
async function parseExcelFile<T>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        // Read file as ArrayBuffer for xlsx parsing
        reader.readAsArrayBuffer(file)
        // When file reading is finished
        reader.onload = (e) => {
            const data = new Uint8Array(e.target!.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            // Get the first sheet
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            // Convert sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            // Convert rows to array of objects for VDataTable
            const keys = jsonData[0] as string[] // Use first row for keys
            const values = jsonData.slice(1).filter((data) => {
                return (data as string[]).length > 0
            }) // Rest are values

            const formattedData = values.map((value: unknown) => {
                const rows = value as any[]
                const rowData: Record<string, any> = {}

                keys.forEach((key, index) => {
                    rowData[key] = rows[index]
                        ? rows[index]
                        : null // Fill empty cells with "null"
                })
                return rowData
            }) as T[]
            resolve(formattedData)
        }

        reader.onerror = (err) => {
            reject(err)
        }
    })
}
async function exportExcel<T>(data: T[]): Promise<void> {
    // สร้างเวิร์กชีต
    const worksheet = XLSX.utils.json_to_sheet(data)
    // สร้างไฟล์เวิร์กบุ๊ค
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    // บันทึกเป็นไฟล์ Excel
    XLSX.writeFile(workbook, `${new Date().toISOString()}-exported_data.xlsx`)
}
export const _file = {
    parseExcelFile,
    exportExcel,
}
