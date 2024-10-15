import classNames from 'classnames';
import ManualInput from '../ManualInput/ManualInput';
import ManualSelect from '../ManualSelect/ManualSelect';
import { RowNames } from '../types';

import './ManualRow.css'

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
  rowName: RowNames;
  rowValue: string;
  fieldConfig: FieldType;
  handleFormDataChange: (name: RowNames, value: string) => void;
}

type FieldType = InputConfig | SelectConfig;

function ManualRow({
  isError,
  label,
  fieldConfig,
  tagName,
  rowName,
  rowValue,
  handleFormDataChange,
}: ManaulRowProps) {
  const rowClass = classNames({
    'row': true,
    'error': isError,
  });

  return (
    <div className={rowClass}>
      <label htmlFor={rowName}>{label}</label>
      <div className="field-wrapper">
        {tagName === 'input' ? (
          <ManualInput
            {...fieldConfig as InputConfig}
            value={rowValue}
            changeEventFunc={(value: string) => handleFormDataChange(rowName, value)}
          />
        ) : (
          <ManualSelect
            {...fieldConfig as SelectConfig}
            value={rowValue}
            changeEventFunc={(value: string) => handleFormDataChange(rowName, value)}
          />
        )}
      </div>
    </div>
  );
}

export default ManualRow;
