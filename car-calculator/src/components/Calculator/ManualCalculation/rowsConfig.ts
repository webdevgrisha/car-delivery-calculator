
import { getColumnData } from "../../../services/firebase/firestoreDb";
import { FormRows } from "./interface";
import { validateInput, validateSelect } from "./validateFunc";

const getFormRows = () => {
    const formRows: FormRows[] = [
        {
            label: 'Cena pojazdu',
            tagName: 'input',
            rowName: 'carPrice',
            fieldConfig: {
                currency: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Engine size',
            tagName: 'select',
            rowName: 'engineSize',
            fieldConfig: {
                selectionOptions: ['Select engine', 'Less 2L', 'More 2L']
            },
            validate: validateSelect,
        },
        {
            label: 'Lokalizacja',
            tagName: 'select',
            rowName: 'location',
            fieldConfig: {
                selectionOptions: getColumnData('shipping_cost_to_a_US_port', 'Location', 'Select location')
                // selectionOptions: [],
            },
            validate: validateSelect,
        },
        {
            label: 'Koszt celny',
            tagName: 'input',
            rowName: 'customsCosts',
            fieldConfig: {
                currency: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Koszty naprawy',
            tagName: 'input',
            rowName: 'repairCosts',
            fieldConfig: {
                currency: 'PLN',
            },
            validate: validateInput,
        },
        {
            label: 'Rozmiar Auta',
            tagName: 'select',
            rowName: 'carSize',
            fieldConfig: {
                selectionOptions: ['Select car', 'Sedan', 'Suv', 'Duży Suv', 'Pickup', 'Van', 'Motor'],
            },
            validate: validateSelect,
        },
    ];

    return formRows;
};

export default getFormRows;