type Currency = 'USD' | 'PLN' | 'EUR';

interface RowData {
    rowName: string;
    rowType: 'info' | 'result';
    currency: Currency;
}

interface CalculationResultSectionData {
    [key: string]: RowData[] | Currency;
}


export type {
    RowData,
    CalculationResultSectionData,
    TotalRow,
    Currency
}