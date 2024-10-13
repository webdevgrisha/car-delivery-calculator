
import { getColumnData } from "../../../services/firebase/firestoreDb";
import { AsyncFieldInfo } from "../interfaces";
import { validateLocation, validateNumberInput, validateSelect } from "../validateFunctions";

const createFiledConfig = () => {
  const fieldsConfig: AsyncFieldInfo[] = [
    {
      tagName: 'select',
      fieldConfig: {
        name: 'Auction',
        selectionOptions: ['None', 'IAAI', 'Copart'],
        validate: validateSelect,
      },
    },
    {
      tagName: 'input',
      fieldConfig: {
        name: 'Location',
        placeholder: 'Anchorage',
        validate: validateLocation,
      },
    },
    {
      tagName: 'input',
      fieldConfig: {
        name: 'State',
        placeholder: 'AK',
        validate: validateLocation,
      },
    },
    {
      tagName: 'select',
      fieldConfig: {
        name: 'To Port',
        selectionOptions: getColumnData('shipping_ports_(from)', 'To Port'),
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



export default createFiledConfig;