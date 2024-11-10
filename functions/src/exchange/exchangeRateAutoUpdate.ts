import admin from "../init";
import {onRequest} from "firebase-functions/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import axios from "axios";


const client = new SecretManagerServiceClient();
const projectId = "liberty-cars-calculator";
const secretName = "exchange-api";
const versionId = "latest";

/**
 * Interface for successful exchange rate response data.
 */
interface ExchangeInfo {
  result: "success";
  documentation: string;
  "base_code": string;
  "target_code": string;
  "conversion_rate": number;
  "conversion_result": number;
}

/**
 * Possible error types for exchange rate requests.
 */
type ErrorType = "unknown-code" |
  "unsupported-code" |
  "malformed-request" |
  "invalid-key" |
  "inactive-account" |
  "quota-reached";

/**
* Interface for exchange rate error response data.
*/
interface ExchangeError {
  result: "error";
  "error-type": ErrorType;
}

/**
 * Function to retrieve currency exchange rate.
 * @param {string} baseCode Base currency code
 * @param {string} targetCode Target currency code
 * @return {Promise<string>} Exchange rate as a string
 */
async function getConversionRate(
  baseCode: string, targetCode: string
): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretName}/versions/${versionId}`,
  });

  const apiKey: string | undefined = version?.payload?.data?.toString();

  if (!apiKey) {
    throw new Error("API key is not set.");
  }

  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCode}/${targetCode}`;

  const response = await axios.get(apiUrl);
  const resultObj = response.data as ExchangeInfo | ExchangeError;

  if (resultObj.result === "error") {
    throw new Error(resultObj["error-type"]);
  }

  return String(resultObj.conversion_rate.toFixed(2));
}


/**
 * Common logic for updating the exchange rate.
 */
async function updateExchangeRateLogic() {
  const firestoreDb = admin.firestore();
  const collectionRef = firestoreDb.collection("exchange").limit(1);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) throw Error("Nothing to update");

  const doc = snapshot.docs[0];
  const docRef = firestoreDb.collection("exchange").doc(doc.id);

  if (doc.data().exchangeRate === "Manual") return;

  const [usdEur, usdPln] = await Promise.all(
    [getConversionRate("USD", "EUR"), getConversionRate("USD", "PLN")]
  );

  await docRef.update({"usd_eur": usdEur, "usd_pln": usdPln});
}


const scheduleExchangeRateUpdate = onSchedule(
  {
    schedule: "0 6,8,10,12,14,16,18,20,22, * * *",
    timeZone: "Europe/Paris",
  },
  updateExchangeRateLogic);

/**
 * HTTP trigger to manually invoke the update.
 */
const updateExchangeRateHttp = onRequest(async (request, response) => {
  try {
    const [version] = await client.accessSecretVersion({
      name: `projects/${projectId}/secrets/${secretName}/versions/${versionId}`,
    });

    const apiKey: string | undefined = version?.payload?.data?.toString();

    if (!apiKey) {
      throw new Error("API key is not set.");
    }

    console.log("Fetching exchange rate from API...");
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/PLN`;

    const fetchResponse = await axios.get(apiUrl);

    const resultObj = fetchResponse.data as ExchangeInfo | ExchangeError;

    if (resultObj.result === "error") {
      response.status(500).send(resultObj["error-type"]);
    } else {
      response.send(String(resultObj.conversion_rate.toFixed(2)));
    }
  } catch (error) {
    console.error(`Error fetching exchange rate: ${error}`, error);
    response.status(500).send("Failed to update exchange rate.");
  }
});


export {scheduleExchangeRateUpdate, updateExchangeRateHttp};
