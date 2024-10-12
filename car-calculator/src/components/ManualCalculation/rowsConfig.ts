
import { getColumnData } from "../../../services/firebase/firestoreDb";
import { FormRows } from "./interface";
import { validateInput, validateSelect } from "./validateFunc";

const getFormRows = () => {
    const formRows: FormRows[] = [
        {
            label: 'Cena pojazdu',
            rowType: 'input',
            rowName: 'carPrice',
            fieldConfig: {
                currency: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Engine size',
            rowType: 'select',
            rowName: 'engineSize',
            fieldConfig: {
                selectionOptions: ['Select engine', 'Less 2L', 'More 2L']
            },
            validate: validateSelect,
        },
        {
            label: 'Lokalizacja',
            rowType: 'select',
            rowName: 'location',
            fieldConfig: {
                // selectionOptions: getColumnData('shipping_cost_to_a_US_port', 'Location')
                selectionOptions: [],
            },
            validate: validateSelect,
        },
        {
            label: 'Koszt celny',
            rowType: 'input',
            rowName: 'customsCosts',
            fieldConfig: {
                currency: 'USD',
            },
            validate: validateInput,
        },
        {
            label: 'Koszty naprawy',
            rowType: 'input',
            rowName: 'repairCosts',
            fieldConfig: {
                currency: 'PLN',
            },
            validate: validateInput,
        },
        {
            label: 'Rozmiar Auta',
            rowType: 'select',
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