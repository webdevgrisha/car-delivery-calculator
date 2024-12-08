import { AsyncFieldInfo } from "../interfaces";
import { validateNumberInput } from "../validateFunctions";

const createFiledConfig = () => {
  const fieldsConfig: AsyncFieldInfo[] = [
    {
      tagName: 'input',
      fieldConfig: {
        name: 'Pojemność silnika',
        placeholder: 'Less 2L',
        validate: () => true,
      },
    },
    {
      tagName: 'input',
      fieldConfig: {
        name: 'Stawka akcyzy',
        placeholder: '0.001',
        type: 'number',
        validate: validateNumberInput,
      },
    },
  ];

  return fieldsConfig;
}



export default createFiledConfig;