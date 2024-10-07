// function isInputValid(value: string) {
//     if(!value.trim().length) return false;
// }

function portValidation(value: string) {
    const regExp = /^[a-z]+/i;

    return regExp.test(value);
}

function validateSelect(value: string) {
    return value !== 'None';
}

function validateNumberInput(value: string) {
    if (value.trim() === '') return true;

    return +value > 0;
}
export {
    portValidation,
    validateSelect,
    validateNumberInput,
}