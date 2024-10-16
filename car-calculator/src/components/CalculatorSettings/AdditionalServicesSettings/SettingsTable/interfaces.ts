import { Currency } from "./types";

interface InvalidServicesIds {
    [key: string]: boolean;
}

interface RowData {
    service_name: string;
    currency: Currency;
    price: string;
    isShown: boolean;
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

export type {
    InvalidServicesIds,
    RowData,
    DeleteActionConfig,
    CreateEditActionConfig,
    ServiceData,
}