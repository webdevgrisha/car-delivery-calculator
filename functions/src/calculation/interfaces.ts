import {Currency} from "./types";

interface Variables {
    auction: string,
    carPrice: string;
    engineSize: string;
    degreeOfDamage: string,
    costInPL: string,
    location: string;
    customsCosts: string;
    repairCosts: string;
    carSize: string;
}

interface Exchange {
    usd_eur: number;
    usd_pln: number;
}

interface SectionRow {
    formula?: string;
    price?: string;
    isShown?: boolean;
    currency: Currency;
    baseCurrency?: Currency;
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
