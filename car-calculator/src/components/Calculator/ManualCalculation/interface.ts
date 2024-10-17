import { FieldConfig, RowNames } from "./types";

interface InputRow {
    currency: 'USD' | 'EUR' | 'PLN';
}

interface SelectRow {
    selectionOptions: string[] | Promise<string[]>;
}

interface FormRows {
    label: string;
    tagName: 'input' | 'select';
    name: RowNames,
    fieldConfig: FieldConfig;
    validate: (value: string) => boolean,
}

export type {
    InputRow,
    SelectRow,
    FormRows,
}