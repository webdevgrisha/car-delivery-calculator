import classNames from 'classnames';
import { RowNames } from '../types';

import './ManualRow.css';
import { CustomInput, CustomSelect } from '../../..';

interface InputConfig {
  currency: 'PLN' | 'USD' | 'EUR';
}

interface SelectConfig {
  selectionOptions: string[] | Promise<string[]>;
}

interface ManaulRowProps {
  isError: boolean;
  label: string;
  tagName: 'input' | 'select';
  name: RowNames;
  value: string;
  fieldConfig: FieldType;
  handleFormDataChange: (name: RowNames, value: string) => void;
}

type FieldType = InputConfig | SelectConfig;

function ManualRow({
  isError,
  label,
  fieldConfig,
  tagName,
  name,
  value,
  handleFormDataChange,
}: ManaulRowProps) {
  const rowClass = classNames({
    row: true,
    error: isError,
  });

  return (
    <div className={rowClass}>
      <div className="column">
        <p>{label}</p>
      </div>
      <div className="column">
        {tagName === 'input' ? (
          <div className="custom-input-wrapper">
            <CustomInput
              name={name}
              value={value}
              type="number"
              placeholder="0"
              changeEventFunc={(value: string) =>
                handleFormDataChange(name, value)
              }
            />

            <span className="currency">
              {(fieldConfig as InputConfig).currency}
            </span>
          </div>
        ) : (
          <CustomSelect
            name={''}
            selectionOptions={(fieldConfig as SelectConfig).selectionOptions}
            value={value}
            changeEventFunc={(value: string) =>
              handleFormDataChange(name, value)
            }
          />
        )}
      </div>
    </div>
  );
}

export default ManualRow;
