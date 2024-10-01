import { CustomInput, CustomSelect } from '..';
import { FieldInfo, InputFieldInfo, SelectedFieldInfo } from '../interfaces';

interface RenderFieldProps {
  isEdit: boolean;
  initValue: string;
  currValue: string;
  field: FieldInfo;
  handleFieldChange: (name: string, value: string) => void;
}

function RenderField({
  isEdit,
  initValue,
  currValue,
  field,
  handleFieldChange,
}: RenderFieldProps) {
  if (!isEdit) {
    return <p>{initValue}</p>;
  }

  const { tagName, fieldConfig } = field;
  const configCopy: InputFieldInfo | SelectedFieldInfo = Object.assign(
    {},
    fieldConfig,
  );

  let newValue = currValue;

  if (currValue === undefined) {
    newValue = initValue;
  }

  // console.log('rerender RenderField!');

  // почему при вызове функции handleFieldChange происходит ререндер компонта
  if (tagName === 'input') {
    return (
      <CustomInput
        {...(configCopy as InputFieldInfo)}
        currValue={newValue}
        changeEventFunc={(value: string) =>
          handleFieldChange(fieldConfig.name, value)
        }
      />
    );
  }

  return (
    <CustomSelect
      {...(configCopy as SelectedFieldInfo)}
      currValue={currValue}
      changeEventFunc={(value: string) =>
        handleFieldChange(fieldConfig.name, value)
      }
    />
  );
}

export default RenderField;
