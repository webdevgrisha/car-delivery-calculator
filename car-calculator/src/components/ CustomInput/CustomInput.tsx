import './CustomInput.css';

type InputFiledType = 'text' | 'number' | 'email';

interface CustomInputProps {
  name: string;
  value: string;
  placeholder?: string;
  type?: InputFiledType;
  isDisabled?: boolean;
  changeEventFunc: (value: string) => void;
}

function CustomInput({
  name,
  value = '',
  placeholder = '',
  type = 'text',
  isDisabled = false,
  changeEventFunc,
}: CustomInputProps) {
  return (
    <input
      className="custom-input"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={isDisabled}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        changeEventFunc(e.target.value)
      }
    />
  );
}

export default CustomInput;
