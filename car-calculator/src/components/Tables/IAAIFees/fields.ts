import { AsyncFieldInfo } from "../interfaces";
import { validateFees, validateNumberInput, validateSellingPrice } from "../validateFunctions";

const createIAAIBuyerFeeFieldsConfig = () => {
    const shippingPortsFieldsConfig: AsyncFieldInfo[] = [
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Cena sprzedaży',
                placeholder: '10-100',
                type: 'text',
                validate: validateSellingPrice,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Wysokość prowizji (Buyer)',
                placeholder: '0',
                type: 'text',
                validate: validateFees,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Wysokość prowizji (Internal)',
                placeholder: '0',
                type: 'text',
                validate: validateFees,
            },
        },
    ];

    return shippingPortsFieldsConfig;
}


const createIAAIConstFeeFieldsConfig = () => {
    const destinationPortsFieldsConfig: AsyncFieldInfo[] = [
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Service Fee',
                placeholder: '0',
                type: 'number',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Environmental Fee',
                placeholder: '0',
                type: 'number',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Broker Fee',
                placeholder: '0',
                type: 'number',
                validate: validateNumberInput,
            },
        },
    ];

    return destinationPortsFieldsConfig;
}

export {
    createIAAIBuyerFeeFieldsConfig,
    createIAAIConstFeeFieldsConfig,
}