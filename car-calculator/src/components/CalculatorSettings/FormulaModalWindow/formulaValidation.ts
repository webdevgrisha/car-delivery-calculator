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

    return true;
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