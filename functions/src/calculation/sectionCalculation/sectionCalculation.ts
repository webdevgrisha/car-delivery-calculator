import {parseFormula, rowCalculator} from "..";
import {SectionRow, Variables} from "../interfaces";
import {Convertor, Currency} from "../types";


async function sectionCalculation(
  variables: Variables,
  convertor: Convertor,
  sectionRows: SectionRow[]
): Promise<number[]> {
  const parsePromiseArr: Promise<(string | number)[]>[] = [];
  let totalUSDSum = 0;
  let totalSumCurrency: Currency = "USD";

  sectionRows.forEach((sectionRow, index) => {
    if (sectionRows.length - 1 === index) {
      totalSumCurrency = sectionRow.currency;
      return;
    }

    const result = parseFormula(
      variables, sectionRow.formula || sectionRow?.price
    );

    parsePromiseArr.push(result);
  });

  const rowsFormula = await Promise.all(parsePromiseArr);

  const calculatedRows = rowsFormula.map((formula, index) => {
    console.log("Parsie formula: ", formula);

    const result = rowCalculator(formula as (string | number)[]) || 0;
    const currency = sectionRows[index].currency;
    const baseCurrency = sectionRows[index].baseCurrency || currency;
    const pow = baseCurrency === "USD" ? 1 : -1;

    const usdResult = convertor[baseCurrency](result, pow);

    totalUSDSum += usdResult;

    const convertorResult = baseCurrency === currency ?
      result :
      convertor[currency](result, pow);


    return Number(convertorResult.toFixed(2));
  });

  const totalResultConverted = convertor[totalSumCurrency](totalUSDSum);

  const shownRows: number[] = calculatedRows.filter((calResult, index) => {
    return sectionRows[index].isShown;
  });

  shownRows.push(Number(totalResultConverted.toFixed(2)));

  return shownRows;
}

export default sectionCalculation;
