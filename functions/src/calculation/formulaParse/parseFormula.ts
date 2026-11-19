import {tableSearch} from "..";
import {Variables} from "../interfaces";

/**
 * Parses a formula string, replacing variables with their corresponding values.
 * @param {Variables} variables - The variables to use for parsing.
 * @param {string | undefined} formula - The formula string to parse.
 * @returns {Promise<Array<string | number | null>>}
 * - An array representing the parsed formula, with variables replaced.
 */
async function parseFormula(
  variables: Variables,
  formula: string | undefined,
): Promise<Array<string | number | typeof NaN>> {
  if (formula === undefined) return [NaN];

  const stack: Array<string | number | typeof NaN> = [];
  let index = 0;

  while (index < formula.length) {
    const symbol = formula[index];

    if (/\s/.test(symbol)) {
      index++;
      continue;
    }

    if (isDigit(symbol)) {
      let num = "";

      while (index < formula.length && isDigit(formula[index])) {
        num += formula[index];
        index++;
      }

      const parsedNumber = Number(num);
      if (Number.isNaN(parsedNumber)) return [NaN];

      stack.push(parsedNumber);
      continue;
    }

    if (symbol === "@" && formula[index + 1] === "[") {
      const varEnd = formula.indexOf("]", index);

      if (varEnd === -1) return [NaN];

      const variable = formula.slice(index + 2, varEnd);
      const variableParseResult = await parseVariable(variables, variable);
      const numericValue = Number(variableParseResult);

      if (Number.isNaN(numericValue)) return [NaN];

      stack.push(numericValue);
      index = varEnd + 1;
      continue;
    }

    if (/[a-zA-Z]/.test(symbol)) {
      let identifier = "";

      while (index < formula.length && /[a-zA-Z]/.test(formula[index])) {
        identifier += formula[index];
        index++;
      }

      const normalizedIdentifier = identifier.toLowerCase();
      if (normalizedIdentifier !== "min" && normalizedIdentifier !== "max") {
        return [NaN];
      }

      stack.push(normalizedIdentifier);
      continue;
    }

    if ("+-*/(),".includes(symbol)) {
      stack.push(symbol);
      index++;
      continue;
    }

    return [NaN];
  }

  return stack;
}


/**
 * Checks if the provided string represents a digit.
 *
 * @param {string} s
 * @return {boolean}
 */
function isDigit(s: string): boolean {
  return (!isNaN(Number(s)) || s === ".") && s.trim() !== "";
}

/**
 * Parses a variable from the given string.
 * @param {Variables} variables
 * @param {string} variable
 * @returns {Promise<string | typeof NaN>}
 */
async function parseVariable(
  variables: Variables,
  variable: string
): Promise<string | typeof NaN> {
  const trimVar: string = variable.trim();

  if (trimVar[0] === "#") {
    const varName = trimVar.slice(1);
    return varName in variables ? variables[varName as keyof Variables] : NaN;
  } else if (trimVar[0] !== "$") {
    return trimVar;
  }

  const tableNameEndIndex = trimVar.indexOf("(", 0);
  if (tableNameEndIndex === -1) return NaN;

  const tableName = trimVar.slice(1, tableNameEndIndex);

  const tableSearchParamsStr = trimVar
    .slice(tableNameEndIndex + 1, variable.length - 1);

  const tableSearchVariables = extractParamsFromStr(tableSearchParamsStr);

  if (!Array.isArray(tableSearchVariables)) return NaN;

  const tableSearchParams = await Promise.all(
    tableSearchVariables.map(
      (tableParam) => parseVariable(variables, tableParam)
    )
  );

  const isInvalid = tableSearchParams.some((param) => Number.isNaN(param));
  if (isInvalid) return NaN;

  return await tableSearch(tableName, tableSearchParams as string[]);
}

function extractParamsFromStr(tableSearchParamsStr: string) {
  const tableSearchParams: string[] = [];

  for (let i = 0; i < tableSearchParamsStr.length; i++) {
    const symbol = tableSearchParamsStr[i];

    if (symbol === " " || symbol === ",") continue;

    if (symbol === "$") {
      const variableEnd = tableSearchParamsStr.indexOf(")", i);

      if (variableEnd === -1) return NaN;

      const variable = tableSearchParamsStr.slice(i, variableEnd + 1);

      tableSearchParams.push(variable);

      i = variableEnd;
      continue;
    }


    const variableEnd = tableSearchParamsStr.indexOf(",", i);

    let variable = null;

    if (variableEnd === -1) {
      variable = tableSearchParamsStr.slice(i);
    } else {
      variable = tableSearchParamsStr.slice(i, variableEnd);
    }

    tableSearchParams.push(variable);

    i = variableEnd === -1 ? tableSearchParamsStr.length : variableEnd;
  }

  return tableSearchParams;
}


export default parseFormula;
