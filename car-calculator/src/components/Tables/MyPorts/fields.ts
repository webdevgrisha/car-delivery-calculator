import { AsyncFieldInfo } from "../interfaces";
import { destinationPortValidation, shippingPortValidation } from "../validateFunctions";

const createShippingPortsFieldsConfig = () => {
    const shippingPortsFieldsConfig: AsyncFieldInfo[] = [
        {
            tagName: 'input',
            fieldConfig: {
                name: 'To Port',
                placeholder: 'Texas, TX',
                type: 'text',
                validate: shippingPortValidation,
            },
        },
    ];

    return shippingPortsFieldsConfig;
}


const createDestinationPortsFieldsConfig = () => {
    const destinationPortsFieldsConfig: AsyncFieldInfo[] = [
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Destination',
                placeholder: 'Rotterdam',
                type: 'text',
                validate: destinationPortValidation,
            },
        },
    ];

    return destinationPortsFieldsConfig;
}


// console.log('shippingPortsFieldsConfig: ', shippingPortsFieldsConfig);
export {
    createShippingPortsFieldsConfig,
    createDestinationPortsFieldsConfig,
}