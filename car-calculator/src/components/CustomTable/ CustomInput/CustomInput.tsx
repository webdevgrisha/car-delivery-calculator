import { useEffect } from 'react';
import './CustomInput.css';

type InputFiledType = 'text' | 'number' | 'email';

interface CustomInputProps {
  name: string;
  currValue: string;
  placeholder?: string;
  type?: InputFiledType;
  changeEventFunc: (value: string) => void;
}

function CustomInput({
  name,
  currValue = '',
  placeholder = '',
  type = 'text',
  changeEventFunc,
}: CustomInputProps) {

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={currValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        changeEventFunc(e.target.value)
      }
    />
  );
}

export default CustomInput;
