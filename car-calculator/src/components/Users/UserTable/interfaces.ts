import { HttpsCallableResult } from "firebase/functions";
import { FieldName, FunctionResult, InputFieldType, Role } from "./types";

interface InputFieldInfo {
    name: FieldName;
    placeholder: string;
    validate: (value: string) => boolean;
    type?: InputFieldType;
    defaultValue?: string;
}

interface SelectedFieldInfo {
    name: FieldName;
    selectionOptions: string[];
    validate: (value: string) => boolean;
    defaultValue?: string;
}

interface InputField {
    tagName: 'input';
    fieldConfig: InputFieldInfo;
}

interface SelectField {
    tagName: 'select';
    fieldConfig: SelectedFieldInfo;
}

interface TableRecord {
    uid: string;
    userData: string[];
}

interface FunctionSuccesResult {
    message: string;
}

interface FunctionErrorResult {
    error: string;
}

interface DeleteFunc {
    (params: { uid: string }): Promise<HttpsCallableResult<FunctionResult>>
}

interface EditFunc {
    (params: { uid: string, name?: string, email?: string, role?: Role }): Promise<HttpsCallableResult<FunctionResult>>
}

interface NewUserData {
    displayName: string,
    email: string,
    role: Role
}

interface AddFunc {
    (params: NewUserData): Promise<HttpsCallableResult<FunctionResult>>
}

export type {
    InputFieldInfo,
    InputField,
    SelectField,
    SelectedFieldInfo,
    TableRecord,
    NewUserData,
    FunctionSuccesResult,
    FunctionErrorResult,
    DeleteFunc,
    EditFunc,
    AddFunc,
}