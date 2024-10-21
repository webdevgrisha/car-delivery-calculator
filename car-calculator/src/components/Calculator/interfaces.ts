interface RowData {
    rowName: string;
    rowType: 'info' | 'result';
    currency: 'USD' | 'PLN' | 'EUR';
}

interface CalculationResultSectionData {
    [key: string]: RowData[];
}


export type {
    RowData,
    CalculationResultSectionData
}