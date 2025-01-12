import { AsyncFieldInfo } from "../interfaces";
import { validateNumberInput } from "../validateFunctions";

const createFiledConfig = () => {
  const fieldsConfig: AsyncFieldInfo[] = [

    {
      tagName: 'select',
      fieldConfig: {
        name: 'Transport type',
        defaultValue: 'car',
        selectionOptions: ['car', 'motor'],
        validate: () => true,
      },
    },
    {
      tagName: 'input',
      fieldConfig: {
        name: 'Clo',
        placeholder: '0.001',
        type: 'number',
        validate: validateNumberInput,
      },
    },
  ];

  return fieldsConfig;
}



export default createFiledConfig;