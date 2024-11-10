import {Currency} from "./types";

interface Variables {
    auction: string,
    carPrice: string,
    engineSize: string,
    location: string,
    customsCosts: string,
    repairCosts: string,
    carSize: string,
}

interface Exchange {
    usd_eur: number;
    usd_pln: number;
}

interface SectionRow {
    formula?: string;
    currency: Currency;
}

interface TotalCost {
    currency: Currency;
}

export type {
  Variables,
  Exchange,
  SectionRow,
  TotalCost,
};
