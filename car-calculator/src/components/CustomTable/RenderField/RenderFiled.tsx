import { CustomInput, CustomSelect } from '../../index';
import { InputFieldInfo, SelectedFieldInfo } from '../interfaces';
import { FieldInfo } from '../types';

interface RenderFieldProps {
  isEdit: boolean;
  initValue: string;
  value: string;
  field: FieldInfo;
  handleFieldChange: (name: string, value: string) => void;
}

function RenderField({
  isEdit,
  initValue,
  value,
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

  let newValue = value;

  if (value === undefined) {
    newValue = initValue;
  }

  if (tagName === 'input') {
    return (
      <CustomInput
        {...(configCopy as InputFieldInfo)}
        value={newValue}
        changeEventFunc={(value: string) =>
          handleFieldChange(fieldConfig.name, value)
        }
      />
    );
  }

  return (
    <CustomSelect
      {...(configCopy as SelectedFieldInfo)}
      value={newValue}
      changeEventFunc={(value: string) =>
        handleFieldChange(fieldConfig.name, value)
      }
    />
  );
}

export default RenderField;
