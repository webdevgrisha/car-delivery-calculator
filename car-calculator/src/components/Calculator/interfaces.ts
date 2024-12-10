type Currency = 'USD' | 'PLN' | 'EUR';

interface RowData {
    rowName: string;
    currency: Currency;
}

interface CalculationResultSectionData {
    [key: string]: RowData[] | Currency;
}

type ClalculationResult = number[][];

interface SelectedAdditionalServices {
    [key: string]: AdditionalService;
}

interface AdditionalService {
    isSelected: boolean;
    rowName: string;
    formula: string;
    currency: Currency;
}

interface CurrencyPrice {
    usd_pln: string;
    usd_eur: string;
}


export type {
    RowData,
    CalculationResultSectionData,
    Currency,
    SelectedAdditionalServices,
    AdditionalService,
    ClalculationResult,
    CurrencyPrice,
}