
import { getColumnData } from "../../../services/firebase/firestoreDb";
import { FormRows } from "./interface";
import { validateInput, validateSelect } from "./validateFunc";

const getFormFields = () => {
    const formRows: FormRows[] = [
        {
            label: 'Aukcja',
            tagName: 'select',
            name: 'auction',
            fieldConfig: {
                selectionOptions: ['Select auction', 'IAAI', 'Copart']
            },
            validate: validateSelect,
        },
        {
            label: 'Cena pojazdu',
            tagName: 'input',
            name: 'carPrice',
            fieldConfig: {
                currency: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Engine size',
            tagName: 'select',
            name: 'engineSize',
            fieldConfig: {
                selectionOptions: ['Select engine', 'Less 2L', 'More 2L']
            },
            validate: validateSelect,
        },
        {
            label: 'Lokalizacja',
            tagName: 'select',
            name: 'location',
            fieldConfig: {
                selectionOptions: getColumnData('shipping_cost_to_a_US_port', 'Location', 'Select location')
                // selectionOptions: [],
            },
            validate: validateSelect,
        },
        {
            label: 'Koszt celny',
            tagName: 'input',
            name: 'customsCosts',
            fieldConfig: {
                currency: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Koszty naprawy',
            tagName: 'input',
            name: 'repairCosts',
            fieldConfig: {
                currency: 'PLN',
            },
            validate: validateInput,
        },
        {
            label: 'Rozmiar Auta',
            tagName: 'select',
            name: 'carSize',
            fieldConfig: {
                selectionOptions: ['Select car', 'Sedan', 'Suv', 'Duży Suv', 'Pickup', 'Van', 'Motor'],
            },
            validate: validateSelect,
        },
    ];

    return formRows;
};

export default getFormFields;