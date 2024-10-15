type Currency = 'USD' | 'EUR' | 'PLN';

interface ServiceData {
    service_id: string;
    service_name: string;
    currency: Currency;
    price: string;
    isShown: boolean;
}

export type {
    ServiceData,
}