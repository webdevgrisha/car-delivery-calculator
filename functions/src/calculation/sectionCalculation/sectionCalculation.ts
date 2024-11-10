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

    const result = parseFormula(variables, sectionRow.formula);

    parsePromiseArr.push(result);
  });

  const rowsFormula = await Promise.all(parsePromiseArr);

  const calculatedRows = rowsFormula.map((formula, index) => {
    console.log("Parsie formula: ", formula);

    const result = rowCalculator(formula as (string | number)[]);
    const currency = sectionRows[index].currency;

    totalUSDSum += result || 0;

    const convertorResult = convertor[currency](result || 0);

    return Number(convertorResult.toFixed(2));
  });

  const totalResultConverted = convertor[totalSumCurrency](totalUSDSum);

  calculatedRows.push(Number(totalResultConverted.toFixed(2)));

  return calculatedRows;
}

export default sectionCalculation;
