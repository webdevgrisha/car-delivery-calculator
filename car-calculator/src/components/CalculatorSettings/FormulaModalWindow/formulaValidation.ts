import { toast } from "react-toastify";

function isFormulaValid(formula: string) {
    const isValidateBrakets = isBalancedBrakets(formula);

    if (!isValidateBrakets) {
        toast.error('missing parentheses');
        return false;
    }

    const isMentionValid = mentionValidation(formula)

    if (!isMentionValid) {
        toast.error('duplicate # or $ signs');
        return false;
    }

    const areFunctionsValid = functionValidation(formula);

    if (!areFunctionsValid) {
        toast.error('only min() and max() functions are supported');
        return false;
    }

    return true;
}

function functionValidation(formula: string) {
    const functionPattern = /(?<![$#])\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
    const supportedFunctions = new Set(['min', 'max']);

    return Array.from(formula.matchAll(functionPattern)).every((match) =>
        supportedFunctions.has(match[1].toLowerCase()),
    );
}

function mentionValidation(formula: string) {
    const regExp = /(\$|#){2,}/;

    return !regExp.test(formula);
}

function isBalancedBrakets(formula: string) {
    let count = 0;

    for (const char of formula) {
        if (char === '(') {
            count++;
        } else if (char === ')') {
            count--;
        }

        if (count < 0) return false;
    }

    return count === 0;
}

export default isFormulaValid;
