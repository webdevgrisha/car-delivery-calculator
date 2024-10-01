type InputFiledType = 'text' | 'number' | 'email';

interface InputFieldInfo {
    name: string;
    defaultValue: string;
    placeholder: string;
    type?: InputFiledType;
}

interface SelectedFieldInfo {
    name: string;
    defaultValue: string;
    selectionOptions: string[];
}

interface InputField {
    tagName: 'input';
    fieldConfig: InputFieldInfo;
}

interface SelectField {
    tagName: 'select';
    fieldConfig: SelectedFieldInfo;
}

type FieldInfo = InputField | SelectField;

interface FieldsValidateFuncs {
    [key: string]: (value: string) => boolean;
}

interface TableRecord {
    id: string;
    rowData: string[];
}

export type {
    InputFieldInfo,
    SelectedFieldInfo,
    FieldInfo,
    FieldsValidateFuncs,
    TableRecord
}