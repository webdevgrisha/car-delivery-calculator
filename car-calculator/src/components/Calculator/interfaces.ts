type Currency = 'USD' | 'PLN' | 'EUR';

interface RowData {
    rowName: string;
    rowType: 'info' | 'result';
    currency: Currency;
}

interface CalculationResultSectionData {
    [key: string]: RowData[] | Currency;
}

type ClalculationResult = number[][];

export type {
    RowData,
    CalculationResultSectionData,
    Currency,
    ClalculationResult
}