import './CustomInput.css';

type InputFiledType = 'text' | 'number' | 'email';

interface CustomInputProps {
  name: string;
  value: string;
  placeholder?: string;
  type?: InputFiledType;
  changeEventFunc: (value: string) => void;
}

function CustomInput({
  name,
  value = '',
  placeholder = '',
  type = 'text',
  changeEventFunc,
}: CustomInputProps) {
  return (
    <input
    className='custom-input'
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        changeEventFunc(e.target.value)
      }
    />
  );
}

export default CustomInput;
