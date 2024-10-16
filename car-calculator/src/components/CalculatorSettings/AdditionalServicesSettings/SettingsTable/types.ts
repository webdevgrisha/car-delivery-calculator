import { CreateEditActionConfig, DeleteActionConfig } from "./interfaces";

type Currency = 'USD' | 'EUR' | 'PLN';

type ServiceAction = DeleteActionConfig | CreateEditActionConfig;


export type {
    Currency,
    ServiceAction
}