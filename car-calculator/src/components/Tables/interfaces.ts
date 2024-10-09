import { InputField } from "../CustomTable/interfaces";

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

interface AsyncSelectedFieldInfo {
    name: string;
    selectionOptions: Promise<string[]> | string[];
    defaultValue?: string;
    validate: (value: string) => boolean,
}

interface SelectField {
    tagName: 'select';
    fieldConfig: AsyncSelectedFieldInfo;
}

type AsyncFieldInfo = InputField | SelectField;

export type {
    CreateTableRecord,
    DeleteTableRowData,
    EditTableData,
    AsyncFieldInfo
}