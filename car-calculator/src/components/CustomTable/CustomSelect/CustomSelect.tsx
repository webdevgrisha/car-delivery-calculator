import './CustomSelect.css';

interface CustomSelectProps {
  name: string;
  selectionOptions: string[];
  value: string;
  changeEventFunc: (value: string) => void;
}

function CustomSelect({
  name,
  selectionOptions,
  value = '',
  changeEventFunc,
}: CustomSelectProps) {
  return (
    <select
      name={name}
      value={value}
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
