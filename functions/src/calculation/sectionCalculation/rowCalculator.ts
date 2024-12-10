type Sign = "-" | "+" | "/" | "*";

function rowCalculator(
  formula: (string | number)[]
) {
  const stack: (string | number)[] = [];
  let sign: Sign = "+";

  const funcs = {
    "+": (num: number) => stack.push(num),
    "-": (num: number) => stack.push(-num),
    "/": (num: number) => stack.push(+(stack.pop() || NaN) / num),
    "*": (num: number) => stack.push(+(stack.pop() || NaN) * num),
  };

  for (let i = 0; i < formula.length; i++) {
    const token = formula[i];

    if (Number.isNaN(token)) return null;

    if (token === "(") {
      let parenthesesCount = 0;

      const startIndex = i + 1;

      while (i < formula.length) {
        if (formula[i] === "(") parenthesesCount++;
        else if (formula[i] === ")") parenthesesCount--;
        if (parenthesesCount === 0) break;
        i++;
      }

      const num = rowCalculator(formula.slice(startIndex, i));
      if (num === null) return null;

      funcs[sign](num);

      continue;
    }

    if (!(token in funcs)) {
      funcs[sign](+token);
      continue;
    }

    sign = token as Sign;
  }

  const rowResult: number = (stack as number[])
    .reduce((accum, currNum) => accum += currNum, 0);

  return Number.isNaN(rowResult) ? null : Number(rowResult.toFixed(2));
}

export default rowCalculator;
