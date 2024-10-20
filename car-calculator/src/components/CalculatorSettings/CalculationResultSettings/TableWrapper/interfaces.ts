import { Currency } from "./types";


// interface RowData {
//     service_name: string;
//     currency: Currency;
//     price: string;
//     isShown: boolean;
// }

// interface DeleteActionConfig {
//     action: 'delete';
//     id: string;
// }

// interface CreateEditActionConfig {
//     action: 'create' | 'edit';
//     id: string;
//     config: RowData;
// }

// interface TableData {
//     id: string;
//     rowData: RowData
// }


interface ResultRow {
    rowType: 'result';
    rowName: string;
    currency: Currency;
}

interface InfoRow {
    rowType: 'info';
    rowName: string;
    currency: Currency;
    isShown: boolean;
    formula: string;
}

interface TableRow {
    id: string;
    rowData: ResultRow | InfoRow;
}

interface TableContext {
    tableName: string;
    tableRows: TableRow[];
    deleteRecordFunc: Function;
    editRecordFunc: Function;
}

export type {
    ResultRow,
    InfoRow,
    TableContext,
    TableRow
}