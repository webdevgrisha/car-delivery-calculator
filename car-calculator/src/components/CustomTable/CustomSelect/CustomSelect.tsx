import './CustomSelect.css';

interface CustomSelectProps {
  name: string;
  defaultValue: string;
  selectionOptions: string[];
  isRequired?: boolean;
  changeEventFunc: (value: string) => void;
}

function CustomSelect({
  name,
  defaultValue,
  selectionOptions,
  isRequired,
  changeEventFunc,
}: CustomSelectProps) {
  return (
    <select
      name={name}
      required={isRequired || false}
      defaultValue={defaultValue}
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
