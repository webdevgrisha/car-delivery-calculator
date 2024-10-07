import { FieldInfo } from "../../CustomTable/types";
import { validateNumberInput, validateSelect } from "../validateFunctions";

const fields: FieldInfo[] = [
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
        validate: validateSelect,
      },
    },
    {
      tagName: 'input',
      fieldConfig: {
        name: 'State',
        placeholder: 'AK',
        validate: validateSelect,
      },
    },
    {
      tagName: 'select',
      fieldConfig: {
        name: 'To Port',
        selectionOptions: ['None', 'IAAI', 'Copart'],
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


  export default fields;