import { SVG_SelectArrow } from '../../assets';
import './CustomSelect.css';

type OptionStringArr = string[];
type OptionObj = { [key: string]: string };
type Option = OptionStringArr | OptionObj;

interface CustomSelectProps {
  name: string;
  selectionOptions: Option;
  value: string;
  changeEventFunc: (value: string) => void;
}

interface RenderOptionProps {
  options: Option;
}

function RenderOption({ options }: RenderOptionProps) {
  const isArray: boolean = Array.isArray(options);

  if (isArray) {
    return (options as OptionStringArr).map((option: string, index: number) => {
      return (
        <option value={index === 0 ? '' : option} key={index}>
          {option}
        </option>
      );
    });
  }

  return Object.entries(options).map(([key, value], index: number) => {
    return (
      <option value={key} key={index}>
        {value}
      </option>
    );
  });
}

function CustomSelect({
  name,
  selectionOptions,
  value = '',
  changeEventFunc,
}: CustomSelectProps) {
  return (
    <div className="custom-select-wrapper">
      <select
        className="custom-select"
        name={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          changeEventFunc(e.target.value)
        }
      >
        <RenderOption options={selectionOptions} />
      </select>
      <span className="arrow">
        <SVG_SelectArrow />
      </span>
    </div>
  );
}

export default CustomSelect;
