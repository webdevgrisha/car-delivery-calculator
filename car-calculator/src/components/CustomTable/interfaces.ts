type InputFiledType = 'text' | 'number' | 'email';

interface InputFieldInfo {
    name: string;
    defaultValue: string;
    placeholder: string;
    type?: InputFiledType;
    isRequired?: boolean;
    validateFunction: (input: string | number) => boolean;
}

interface SelectedFieldInfo {
    name: string;
    defaultValue: string;
    selectionOptions: string[];
    isRequired?: boolean;
    validateFunction: (input: string | number) => boolean;
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

interface Record {
    id: string;
    rowData: string[];
}

export type {
    InputFieldInfo,
    SelectedFieldInfo,
    FieldInfo,
    Record
}