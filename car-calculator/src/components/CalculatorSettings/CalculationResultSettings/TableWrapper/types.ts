import { AddActionData, CreateEditActionConfig, DeleteActionConfig, DeleteActionData, EidtActionData, InfoRow, InitActionData, MoveActionData, OrderActionConfig, OrderRow, ResultRow, SaveActionData, TableRow } from "./interfaces";

type Currency = 'USD' | 'EUR' | 'PLN';

type TableAction = DeleteActionConfig | CreateEditActionConfig | OrderActionConfig;

type Action = InitActionData | EidtActionData | DeleteActionData | AddActionData | SaveActionData | MoveActionData;

type RowData = ResultRow | InfoRow | OrderRow;

type RowType = 'info' | 'result' | 'order';

export type {
    Currency,
    TableAction,
    Action,
    RowData,
    RowType
}