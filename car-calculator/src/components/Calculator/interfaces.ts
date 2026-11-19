type Currency = 'USD' | 'PLN' | 'EUR';

interface RowData {
    id?: string;
    rowName: string;
    currency: Currency;
    isOptional?: boolean;
}

type CalculationSection =
    | 'auction_and_shipping'
    | 'customs_clearance'
    | 'other_payments';

type SelectedOptionalRows = Record<CalculationSection, string[]>;

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

interface CarData {
    title: string;
    imgs: string[];
    stock: string;
    odometer: string;
    engine: string;
    fuelType: string;
    primaryDamage: string;
    transmission: string;
    keys: string;
    location: string;
    auction: string;
  }

export type {
    RowData,
    CalculationResultSectionData,
    Currency,
    SelectedAdditionalServices,
    AdditionalService,
    ClalculationResult,
    CurrencyPrice,
    CarData,
    CalculationSection,
    SelectedOptionalRows,
}
