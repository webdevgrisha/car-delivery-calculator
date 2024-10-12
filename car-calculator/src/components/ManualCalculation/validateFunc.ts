function validateSelect(value: string) {
    return value !== '';
}

function validateInput(value: string) {
    if(value === '') return false;

    const number: number = +value;

    return number >= 0;
}

export {
    validateSelect,
    validateInput
}