function validateSelect(value: string) {
    return value !== '';
}

function validateInput(value: string) {
    if (value === '') return false;

    const number: number = +value;

    return number >= 0;
}

function validateOptionalInput(value: string) {
    if (value === '') return true;

    const number: number = +value;

    return number >= 0;
}

function validateDamegeDegree(value: string) {
    if (value === '') return true;

    const number: number = +value;

    return number >= 0 && number <= 100;
}

export {
    validateSelect,
    validateInput,
    validateOptionalInput,
    validateDamegeDegree
}