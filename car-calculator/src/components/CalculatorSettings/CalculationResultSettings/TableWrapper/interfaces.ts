import { ShowModalFunc } from "../interfaces";
import { Currency, RowData, TableAction } from "./types";

interface ResultRow {
    rowType: 'result';
    rowName: string;
    currency: Currency;
}

interface InfoRow {
    rowType: 'info';
    rowName: string;
    currency: Currency;
    baseCurrency: Currency;
    isShown: boolean;
    formula: string;
}

interface OrderRow {
    rowType: 'order';
    rowsOrder: string[];
}

interface DeleteActionConfig {
    action: 'delete';
    id: string;
}

interface CreateEditActionConfig {
    action: 'create' | 'edit';
    id: string;
    config: RowData;
}

interface OrderActionConfig {
    action: 'order';
    id: string;
    config: {
        rowsOrder: string[],
    }
}

interface TableRow<T extends RowData> {
    id: string;
    rowData: T;
}

interface InfoObj {
    [key: string]: InfoRow
}

interface CalculatorSettingsTable {
    info: InfoObj;
    result: TableRow<ResultRow>;
    order: TableRow<OrderRow>;
}

interface InitActionData {
    type: 'init';
    initRows: CalculatorSettingsTable;
}

interface EditActionData<T extends ResultRow | InfoRow> {
    type: 'edit';
    rowId: string;
    rowName: keyof T;
    rowType: T['rowType'];
    newValue: T[keyof T];
    servicesAction: TableAction;
}

interface DeleteActionData {
    type: 'delete';
    rowId: string;
    servicesAction: TableAction;
}

interface AddActionData {
    type: 'add';
    rowId: string;
    servicesAction: TableAction;
}

interface SaveActionData {
    type: 'save';
    orderRowId: string;
    newRowsOrder: string[];
    servicesAction: TableAction;
}

interface MoveActionData {
    type: 'move';
    newRowsOrder: string[];
}

interface HandleFieldChange {
    <T extends InfoRow | ResultRow>(
        id: string,
        name: keyof T | 'isShown' | 'formula',
        value: T[keyof T] | boolean,
        rowType: T['rowType']
    ): void;
}

interface TableContext {
    tableName: string;
    tableRows: CalculatorSettingsTable;
    deleteRecordFunc: (id: string) => void;
    editRecordFunc: HandleFieldChange;
    moveRowsFunc: (newRowsOrder: string[]) => void;
    showModal: ShowModalFunc;
}

export type {
    ResultRow,
    InfoRow,
    OrderRow,
    HandleFieldChange,
    TableContext,
    TableRow,
    CalculatorSettingsTable,
    RowData,
    DeleteActionConfig,
    CreateEditActionConfig,
    OrderActionConfig,
    InitActionData,
    EditActionData,
    DeleteActionData,
    AddActionData,
    SaveActionData,
    MoveActionData,
}