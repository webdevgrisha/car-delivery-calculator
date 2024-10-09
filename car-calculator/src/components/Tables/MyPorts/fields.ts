import { AsyncFieldInfo } from "../interfaces";
import { portValidation } from "../validateFunctions";

const createShippingPortsFieldsConfig = () => {
    const shippingPortsFieldsConfig: AsyncFieldInfo[] = [
        {
            tagName: 'input',
            fieldConfig: {
                name: 'To Port',
                placeholder: 'To port',
                type: 'text',
                validate: portValidation,
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
                placeholder: 'Destination port',
                type: 'text',
                validate: portValidation,
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