type Currency = "USD" | "PLN" | "EUR";

type Convertor = {
    [key in Currency]: (num: number, pow?: number) => number;
};

export type {
  Currency,
  Convertor,
};
