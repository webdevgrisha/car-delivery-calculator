// function isInputValid(value: string) {
//     if(!value.trim().length) return false;
// }

function shippingPortValidation(value: string) {
    const regExp = /^[a-z]+, [A-Z]{2}/i;

    return regExp.test(value);
}

function destinationPortValidation(value: string) {
    const regExp = /^[a-z]+/i;

    return regExp.test(value);
}

function validateLocation(value: string) {
    return value.length > 0;
}

function validateSelect(value: string) {
    console.log('validateSelect: ', value);
    return value !== 'None' && value.trim() !== "";
}

function validateNumberInput(value: string) {
    if (value.trim() === '') return true;

    return +value > 0;
}

function validateSellingPrice(value: string): boolean {
    const [num1, num2] = value.split('-');

    console.log({ num1, num2 });


    if (!(num1 && num2)) return false;

    if (num2 === undefined) {
        const parseNum = parseFloat(num1);
        const isLastCharPlus = num1[num1.length - 1] === '+';
        const isEquals = num1 === parseNum + '%';

        return !!parseNum && isLastCharPlus && isEquals;
    }

    const numCheck = !(+num1 < 0 || +num2 < 0 || +num2 <= +num1);

    return numCheck;
}

function validateFees(value: string): boolean {
    const num = +value;

    if (!isNaN(num)) {
        return num >= 0;
    } else {
        const parseNum = parseFloat(value);
        const isLastCharPresent = value[value.length - 1] === '%';
        const isEquals = value === parseNum + '%';

        return !!parseNum && isLastCharPresent && isEquals;
    }
}


export {
    shippingPortValidation,
    destinationPortValidation,
    validateSelect,
    validateNumberInput,
    validateLocation,
    validateSellingPrice,
    validateFees
}