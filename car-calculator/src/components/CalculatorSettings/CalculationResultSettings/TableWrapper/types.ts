import { AddActionData, CreateEditActionConfig, DeleteActionConfig, DeleteActionData, EditActionData, InfoRow, InitActionData, MoveActionData, OrderActionConfig, OrderRow, ResultRow, SaveActionData } from "./interfaces";

type Currency = 'USD' | 'EUR' | 'PLN';

interface TableAction {
    [key: string]: DeleteActionConfig | CreateEditActionConfig | OrderActionConfig
}

type Action = InitActionData | EditActionData<InfoRow | ResultRow> | DeleteActionData | AddActionData | SaveActionData | MoveActionData;

type RowData = ResultRow | InfoRow | OrderRow;

type RowType = 'info' | 'result' | 'order';

export type {
    Currency,
    TableAction,
    Action,
    RowData,
    RowType
}