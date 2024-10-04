interface CreateTableRecord {
    [key: string]: string;
}

interface EditTableData {
    id: string;
    editRecordData: {
        [key: string]: string;
    }
}

interface DeleteTableRowData {
    id: string;
}

export type {
    CreateTableRecord,
    DeleteTableRowData,
    EditTableData,
}