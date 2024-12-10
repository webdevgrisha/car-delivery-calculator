import classNames from 'classnames';
import { SVG_SelectArrow } from '../../assets';
import './CustomSelect.css';
import { useEffect, useState } from 'react';

type PromiseStingArr = Promise<string[]>;
type OptionStringArr = string[];
type OptionObj = { [key: string]: string };
type Option = OptionStringArr | OptionObj | PromiseStingArr;

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
  const [renderOptions, setRenderOptions] = useState<string[] | OptionObj>([]);

  useEffect(() => {
    if (Array.isArray(selectionOptions) || !('then' in selectionOptions)) {
      setRenderOptions(selectionOptions);
      return;
    }

    (selectionOptions as PromiseStingArr).then((data) =>
      setRenderOptions(data),
    );
  }, []);

  const selectClasses = classNames({
    'custom-select': true,
    'init-option': value === '',
  });

  return (
    <div className="custom-select-wrapper">
      <select
        className={selectClasses}
        name={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          changeEventFunc(e.target.value)
        }
      >
        <RenderOption options={renderOptions} />
      </select>
      <span className="arrow">
        <SVG_SelectArrow />
      </span>
    </div>
  );
}

export default CustomSelect;
