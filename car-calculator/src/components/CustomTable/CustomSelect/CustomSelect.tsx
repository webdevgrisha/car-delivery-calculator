import { useEffect } from 'react';
import './CustomSelect.css';

interface CustomSelectProps {
  name: string;
  selectionOptions: string[];
  currValue: string;
  changeEventFunc: (value: string) => void;
}

function CustomSelect({
  name,
  selectionOptions,
  currValue = '',
  changeEventFunc,
}: CustomSelectProps) {
  // useEffect(() => {
  //   changeEventFunc(defaultValue);
  // }, []);

  return (
    <select
      name={name}
      value={currValue}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        changeEventFunc(e.target.value)
      }
    >
      {selectionOptions.map((option: string, index: number) => {
        return (
          <option value={option} key={index}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default CustomSelect;
