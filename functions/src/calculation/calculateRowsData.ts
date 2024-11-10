import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {
  getCalculatorSectionData,
  getExchangeRate,
  getTotalCarCost,
  sectionCalculation,
} from ".";
import {SectionRow, TotalCost, Variables} from "./interfaces";
import {Convertor, Currency} from "./types";

export const calculateRowsData = onCall(
  async (
    request: CallableRequest<{ variables: Variables }>
  ) => {
    try {
      const {variables} = request.data;

      const {usd_eur: usdEur, usd_pln: usdPln} = await getExchangeRate();

      const convertor: Convertor = {
        "EUR": (num: number, pow = 1) => num * usdEur ** pow,
        "PLN": (num: number, pow = 1) => num * usdPln ** pow,
        "USD": (num: number) => num,
      };

      // eslint-disable-next-line new-cap
      variables.repairCosts = convertor["PLN"](+variables.repairCosts, -1)
        .toString();

      let totalSectionsSumCurrency: Currency = "PLN";

      const sectionData = await Promise.all([
        getCalculatorSectionData("auction_and_shipping"),
        getCalculatorSectionData("customs_clearance"),
        getCalculatorSectionData("other_payments"),
        getTotalCarCost(),
      ]);

      const sectionsCalculation: Promise<number[]>[] = [];

      sectionData.forEach((section, index) => {
        if (index === sectionData.length - 1) {
          totalSectionsSumCurrency = (section as TotalCost).currency;
          return;
        }

        const sectionResult: Promise<number[]> =
          sectionCalculation(variables, convertor, section as SectionRow[]);

        sectionsCalculation.push(sectionResult);
      });

      const sectionCalculationResult: number[][] =
        await Promise.all(sectionsCalculation);

      const totalUSDSum = sectionCalculationResult.reduce(
        (accum, section, index) => {
          const sectionSum = section.at(-1);

          if (sectionSum === undefined) return accum;

          const sectionTotalCurrency = (sectionData[index] as SectionRow[])
            .at(-1)!.currency;

          accum += convertor[sectionTotalCurrency](sectionSum, -1);

          return accum;
        }, 0);

      const totalSum = convertor[totalSectionsSumCurrency](totalUSDSum);

      sectionCalculationResult.push([Number(totalSum.toFixed(2))]);

      return sectionCalculationResult;
    } catch (err) {
      console.error("Error in calculateRowsData:", err);

      return {error: `"Calculation failed", ${err}`};
    }
  }
);


