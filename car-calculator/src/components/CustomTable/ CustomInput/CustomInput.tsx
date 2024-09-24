import './CustomInput.css';

type InputFiledType = 'text' | 'number' | 'email';

interface CustomInputProps {
  name: string;
  defaultValue: string;
  placeholder?: string;
  type?: InputFiledType;
  isRequired?: boolean;
  changeEventFunc: (value: string) => void;
}

function CustomInput({
  name,
  defaultValue,
  placeholder,
  type,
  isRequired,
  changeEventFunc,
}: CustomInputProps) {
  console.log('rerender!!!');

  return (
    <input
      type={type || 'text'}
      name={name}
      placeholder={placeholder || ''}
      required={isRequired || false}
      defaultValue={defaultValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        changeEventFunc(e.target.value)
      }
    />
  );
}

export default CustomInput;
