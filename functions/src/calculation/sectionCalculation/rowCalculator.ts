type Sign = "-" | "+" | "/" | "*";

function rowCalculator(
  formula: (string | number)[]
) {
  const stack: number[] = [];
  let sign: Sign = "+";

  const funcs = {
    "+": (num: number) => stack.push(num),
    "-": (num: number) => stack.push(-num),
    "/": (num: number) => {
      const previous = stack.pop();
      return stack.push((previous ?? NaN) / num);
    },
    "*": (num: number) => {
      const previous = stack.pop();
      return stack.push((previous ?? NaN) * num);
    },
  };

  for (let i = 0; i < formula.length; i++) {
    const token = formula[i];

    if (Number.isNaN(token)) return null;

    if (token === "min" || token === "max") {
      const openParenthesisIndex = i + 1;
      if (formula[openParenthesisIndex] !== "(") return null;

      const closingParenthesisIndex = findClosingParenthesis(
        formula,
        openParenthesisIndex
      );
      if (closingParenthesisIndex === -1) return null;

      const functionArguments = splitFunctionArguments(
        formula.slice(openParenthesisIndex + 1, closingParenthesisIndex)
      );
      if (functionArguments.length < 2) return null;

      const argumentValues = functionArguments.map(rowCalculator);
      if (argumentValues.some((value) => value === null)) return null;

      const limitResult = token === "min" ?
        Math.min(...argumentValues as number[]) :
        Math.max(...argumentValues as number[]);

      funcs[sign](limitResult);
      i = closingParenthesisIndex;
      continue;
    }

    if (token === "(") {
      const startIndex = i + 1;
      const closingParenthesisIndex = findClosingParenthesis(formula, i);
      if (closingParenthesisIndex === -1) return null;

      const num = rowCalculator(
        formula.slice(startIndex, closingParenthesisIndex)
      );
      if (num === null) return null;

      funcs[sign](num);
      i = closingParenthesisIndex;

      continue;
    }

    if (typeof token === "number") {
      funcs[sign](token);
      continue;
    }

    if (token in funcs) {
      sign = token as Sign;
      continue;
    }

    return null;
  }

  const rowResult: number = stack
    .reduce((accum, currNum) => accum += currNum, 0);

  return Number.isNaN(rowResult) ? null : Number(rowResult.toFixed(2));
}

function findClosingParenthesis(
  formula: (string | number)[],
  openParenthesisIndex: number
): number {
  let depth = 0;

  for (let i = openParenthesisIndex; i < formula.length; i++) {
    if (formula[i] === "(") depth++;
    if (formula[i] === ")") depth--;
    if (depth === 0) return i;
  }

  return -1;
}

function splitFunctionArguments(
  formula: (string | number)[]
): (string | number)[][] {
  const argumentsList: (string | number)[][] = [];
  let argumentStart = 0;
  let depth = 0;

  formula.forEach((token, index) => {
    if (token === "(") depth++;
    if (token === ")") depth--;

    if (token === "," && depth === 0) {
      argumentsList.push(formula.slice(argumentStart, index));
      argumentStart = index + 1;
    }
  });

  argumentsList.push(formula.slice(argumentStart));
  return argumentsList;
}

export default rowCalculator;
