import { FieldConfig, RowNames } from "./types";

interface InputRow {
    currency: 'USD' | 'EUR' | 'PLN';
}

interface SelectRow {
    selectionOptions: string[];
}

interface FormRows {
    label: string;
    rowType: 'input' | 'select';
    rowName: RowNames,
    fieldConfig: FieldConfig;
    validate: (value: string) => boolean,
}

export type {
    InputRow,
    SelectRow,
    FormRows,
}