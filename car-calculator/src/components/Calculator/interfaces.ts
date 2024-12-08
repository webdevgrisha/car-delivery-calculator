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

interface SelectedAdditionalServices {
    [key: string]: AdditionalService;
}

interface AdditionalService {
    isSelected: boolean;
    rowName: string;
    price: string;
    currency: Currency;
}

type Convertor = {
    [key in Currency]: (num: number, pow?: number) => number;
};

interface CurrencyPrice {
    usd_pln: string;
    usd_eur: string;
}

interface CalcultorData {
    // exchange: {
    //     usd_pln: string;
    //     usd_eur: string;
    //     convertor: Convertor;
    // }
}


export type {
    RowData,
    CalculationResultSectionData,
    Currency,
    SelectedAdditionalServices,
    AdditionalService,
    ClalculationResult,
    CalcultorData,
    CurrencyPrice,
}