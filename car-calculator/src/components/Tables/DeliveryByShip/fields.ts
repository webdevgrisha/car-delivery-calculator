import { getColumnData } from "../../../services/firebase/firestoreDb";
import { AsyncFieldInfo } from "../interfaces";
import { validateNumberInput, validateSelect } from "../validateFunctions";

console.log('call column data');

const createFieldsConfig = () => {
    const fieldsConfig: AsyncFieldInfo[] = [
        {
            tagName: 'select',
            fieldConfig: {
                name: 'From',
                selectionOptions: getColumnData('shipping_ports_(from)', 'To Port', 'Select from port'),
                validate: validateSelect,
            },
        },
        {
            tagName: 'select',
            fieldConfig: {
                name: 'Destination',
                selectionOptions: getColumnData('destination_ports_(to)', 'Destination', 'Select destination port'),
                validate: validateSelect,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Sedan',
                type: 'number',
                placeholder: '0',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Suv',
                type: 'number',
                placeholder: '0',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Duży Suv',
                type: 'number',
                placeholder: '0',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Pickup',
                type: 'number',
                placeholder: '0',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Van',
                type: 'number',
                placeholder: '0',
                validate: validateNumberInput,
            },
        },
        {
            tagName: 'input',
            fieldConfig: {
                name: 'Motor',
                type: 'number',
                placeholder: '0',
                validate: validateNumberInput,
            },
        },
    ];

    return fieldsConfig;
}


export default createFieldsConfig;