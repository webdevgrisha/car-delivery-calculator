
import { getColumnData } from "../../../services/firebase/firestoreDb";
import { FormRows } from "./interface";
import { validateDamegeDegree, validateInput, validateOptionalInput, validateSelect } from "./validateFunc";

const getFormFields = () => {
    const formRows: FormRows[] = [
        // {
        //     label: 'Aukcja',
        //     tagName: 'select',
        //     name: 'auction',
        //     fieldConfig: {
        //         selectionOptions: ['Select auction', 'IAAI', 'Copart']
        //     },
        //     validate: validateSelect,
        // },
        {
            label: 'Cena pojazdu',
            tagName: 'input',
            name: 'carPrice',
            fieldConfig: {
                measure: 'USD',
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
            validate: () => true,
        },
        {
            label: 'Degree Of Damage',
            tagName: 'input',
            name: 'degreeOfDamage',
            fieldConfig: {
                measure: '%'
            },
            validate: validateDamegeDegree,
        },
        {
            label: 'Wartość w PL',
            tagName: 'input',
            name: 'costInPL',
            fieldConfig: {
                measure: 'PLN',
            },
            validate: validateOptionalInput,
        },
        {
            label: 'Lokalizacja',
            tagName: 'select',
            name: 'location',
            fieldConfig: {
                selectionOptions: getColumnData('shipping_cost_to_a_US_port', 'Location', 'Select location'),
            },
            validate: validateSelect,
        },
        {
            label: 'Koszt celny',
            tagName: 'input',
            name: 'customsCosts',
            fieldConfig: {
                measure: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Koszty naprawy',
            tagName: 'input',
            name: 'repairCosts',
            fieldConfig: {
                measure: 'PLN',
            },
            validate: validateOptionalInput,
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