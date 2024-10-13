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
export {
    shippingPortValidation,
    destinationPortValidation,
    validateSelect,
    validateNumberInput,
    validateLocation,
}