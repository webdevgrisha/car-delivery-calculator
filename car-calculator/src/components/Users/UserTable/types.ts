import { FunctionErrorResult, FunctionSuccesResult, InputField, SelectField } from "./interfaces";

type InputFieldType = 'text' | 'number' | 'email';

type FieldName = 'displayName' | 'email' | 'role';

type Role = 'user' | 'admin';

type FieldInfo = InputField | SelectField;

type FunctionResult = FunctionSuccesResult | FunctionErrorResult;

export type {
    InputFieldType,
    FieldName,
    Role,
    FieldInfo,
    FunctionResult
}