import { AddActionData, CreateEditActionConfig, DeleteActionConfig, DeleteActionData, EidtActionData, InitActionData, SaveActionData } from "./interfaces";

type Currency = 'USD' | 'EUR' | 'PLN';

type Action = InitActionData | EidtActionData | DeleteActionData | AddActionData | SaveActionData;

export type {
    Currency,
    Action
}