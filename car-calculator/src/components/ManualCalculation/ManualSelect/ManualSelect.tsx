import classNames from 'classnames';

import { SVG_SelectArrow } from '../../../assets';
import './ManualSelect.css';

interface ManaulSelectProps {
  value: string;
  selectionOptions: string[];
  changeEventFunc: (value: string) => void;
}

function ManualSelect({
  value = '',
  selectionOptions,
  changeEventFunc,
}: ManaulSelectProps) {
  const selectClass = classNames({
    'init-option': value === '',
  });

  return (
    <>
      <select
        value={value}
        className={selectClass}
        onChange={(e) => changeEventFunc(e.target.value)}
      >
        {selectionOptions.map((option: string, index: number) => {
          const optionValue = index === 0 ? '' : option;

          return (
            <option value={optionValue} key={index}>
              {option}
            </option>
          );
        })}
      </select>
      <span className="arrow">
        <SVG_SelectArrow />
      </span>
    </>
  );
}

export default ManualSelect;
