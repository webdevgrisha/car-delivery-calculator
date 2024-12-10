import { FieldInfo, InputFiledType } from "./types";

interface InputFieldInfo {
    name: string;
    placeholder: string;
    validate: (value: string) => boolean,
    defaultValue?: string;
    type?: InputFiledType;
}

interface SelectedFieldInfo {
    name: string;
    selectionOptions: string[] | Promise<string[]>;
    defaultValue?: string;
    validate: (value: string) => boolean,
}

interface InputField {
    tagName: 'input';
    fieldConfig: InputFieldInfo;
}

interface SelectField {
    tagName: 'select';
    fieldConfig: SelectedFieldInfo;
}

interface FieldData {
    [key: string]: string;
}

interface TableRecord {
    id: string;
    rowData: FieldData;
}

interface TableContext {
    columnNames: string[];
    fields: FieldInfo[];
    records: TableRecord[];
    addNewRecordFunc: Function;
    deleteRecordFunc: Function;
    editRecordFunc: Function;
}

interface ResponseData {
    message?: string;
    error?: string;
}


export type {
    InputField,
    SelectField,
    InputFieldInfo,
    SelectedFieldInfo,
    TableRecord,
    FieldData,
    TableContext,
    ResponseData
}