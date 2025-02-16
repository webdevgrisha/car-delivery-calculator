
import { InputField, SelectField, TableRecord } from "./interfaces";

type TableData = TableRecord[];

type InputFiledType = 'text' | 'number' | 'email';

type FieldInfo = InputField | SelectField;

export type {
    TableData,
    InputFiledType,
    FieldInfo,
}