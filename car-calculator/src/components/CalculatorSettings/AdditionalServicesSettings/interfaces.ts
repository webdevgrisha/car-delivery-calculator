import { Currency } from "./types";

interface RowData {
    rowName: string;
    currency: Currency;
    baseCurrency: Currency;
    formula: string;
    isShown: boolean;
    error?: boolean;
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

interface ServiceData {
    id: string;
    rowData: RowData
}

interface InitActionData {
    type: 'init';
    initServices: ServiceData[];
}

interface EidtActionData {
    type: 'edit';
    rowId: string; 
    rowName: keyof RowData;
    newValue: RowData[keyof RowData];
    servicesAction: ServiceAction;
}

interface DeleteActionData {
    type: 'delete';
    rowId: string;
    servicesAction: ServiceAction;
}

interface AddActionData {
    type: 'add';
    rowId: string;
    servicesAction: ServiceAction;
}

interface SaveActionData {
    type: 'save';
}

interface HandleFieldChange {
    <K extends keyof ServiceData['rowData']>(
        id: string,
        name: K,
        value: ServiceData['rowData'][K]
    ): void;
}

interface TableContext {
    tableRows: ServiceData[];
    deleteRecordFunc: (id: string) => void;
    editRecordFunc: HandleFieldChange;
    showModal: ShowModalFunc;
}

interface ServiceAction {
    [key: string]: DeleteActionConfig | CreateEditActionConfig;
}

interface FormulaModalWindowData {
    isShown: boolean;
    rowFormula: string;
    rowName: string;
    setRowFormula: (formula: string) => void;
}

interface ShowModalFunc {
    (formula: string, rowName: string, setFormula: (formula: string) => void): void;
}

interface ResponseData {
    message?: string;
    error?: string;
}

export type {
    RowData,
    DeleteActionConfig,
    CreateEditActionConfig,
    ServiceData,
    InitActionData,
    EidtActionData,
    DeleteActionData,
    AddActionData,
    SaveActionData,
    HandleFieldChange,
    TableContext,
    ServiceAction,
    FormulaModalWindowData,
    ShowModalFunc,
    ResponseData
}