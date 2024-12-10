import { FieldConfig, RowNames } from "./types";

interface InputRow {
    measure: 'USD' | 'EUR' | 'PLN' | '%';
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

interface FormData {
    // auction: string;
    carPrice: string;
    engineSize: string;
    degreeOfDamage: string,
    costInPL: string,
    location: string;
    customsCosts: string;
    repairCosts: string;
    carSize: string;
  }

export type {
    InputRow,
    SelectRow,
    FormRows,
    FormData
}