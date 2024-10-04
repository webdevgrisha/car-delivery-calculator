// function isInputValid(value: string) {
//     if(!value.trim().length) return false;
// }

function validateSelect(value: string) {
    return value !== 'None';
}

export {
    validateSelect,
}