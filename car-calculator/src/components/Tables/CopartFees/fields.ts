import { AsyncFieldInfo } from "../interfaces";
import { validateFees, validateNumberInput, validateSellingPrice } from "../validateFunctions";

const createCopartBuyerFeeFieldsConfig = () => {
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
                name: 'Wysokość prowizji',
                placeholder: '0',
                type: 'text',
                validate: validateFees,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'LiveBid',
                placeholder: '0',
                type: 'text',
                validate: validateFees,
            },
        },
    ];

    return shippingPortsFieldsConfig;
}


const createCopartConstFeeFieldsConfig = () => {
    const destinationPortsFieldsConfig: AsyncFieldInfo[] = [
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
                name: 'Gate Fee',
                placeholder: '0',
                type: 'number',
                validate: validateNumberInput,
            },
        },
    ];

    return destinationPortsFieldsConfig;
}

export {
    createCopartBuyerFeeFieldsConfig,
    createCopartConstFeeFieldsConfig,
}