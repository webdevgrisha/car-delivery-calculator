import { InputRow, SelectRow } from "./interface";

type FieldConfig = InputRow | SelectRow;

type RowNames = 'auction' | 'carPrice' | 'engineSize' | 'location' | 'customsCosts' | 'repairCosts' | 'carSize';


export type {
    FieldConfig,
    RowNames,
}