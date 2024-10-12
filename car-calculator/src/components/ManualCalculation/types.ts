import { InputRow, SelectRow } from "./interface";

type FieldConfig = InputRow | SelectRow;

type RowNames = 'carPrice' | 'engineSize' | 'location' | 'customsCosts' | 'repairCosts' | 'carSize';


export type {
    FieldConfig,
    RowNames,
}