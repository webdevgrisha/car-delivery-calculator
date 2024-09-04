import { Exchange_API_KEY } from '../constants';

interface ExchangeInfo {
    result: "success";
    documentation: string;
    "terms_of_use": string;
    "time_last_update_unix": string;
    "time_last_update_utc": Date;
    "time_next_update_unix": number;
    "time_next_update_utc": string;
    "base_code": string;
    "target_code": string;
    "conversion_rate": number;
    "conversion_result": number;
}

type ErrorType = "unknown-code" | "unsupported-code" | "malformed-request" | "invalid-key" | "inactive-account" | "quota-reached";

interface ExchangeError {
    result: "error";
    "error-type": ErrorType;
}

async function getConversion(baseCode: string, targetCode: string) {
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${Exchange_API_KEY}/pair/${baseCode}/${targetCode}`,
        );

        const resultObj: ExchangeInfo | ExchangeError = await response.json();

        if (resultObj.result === 'error') throw Error(resultObj['error-type']);

        return resultObj["conversion_rate"].toFixed(2);
    } catch (err) {
        return { status: 'error', message: err.message }
    }
}

export { getConversion };