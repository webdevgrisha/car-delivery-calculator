import { useCallback, useState } from 'react';
import { useImmer } from 'use-immer';
import { SVG_Add } from '../../../assets';

import './CreateNewRecord.css';
import { CustomInput, CustomSelect } from '../../index';
import { InputFieldInfo, SelectedFieldInfo } from '../interfaces';

import { showWarningToastMessage, showUpdateToast } from '../tableToast';
import { Id, toast } from 'react-toastify';
import { FieldInfo } from '../types';
import { useCustomTableContext } from '../tableContext';

function CreateNewRecord() {
  const { fields, addNewRecordFunc } = useCustomTableContext();
  
  const [newRecordDataConfig] = useState(() => createConfig(fields));

  const [newRecordData, setNewRecordData] =
    useImmer<Record<string, string>>(newRecordDataConfig);

  const [invalidFields, setInvalidFields] = useImmer<Record<string, boolean>>(
    {},
  );

  const handleFieldChange = useCallback(
    (name: string, value: string) => {
      setNewRecordData((draft) => {
        draft[name] = value;
      });

      if (invalidFields[name]) {
        setInvalidFields((draft) => {
          draft[name] = false;
        });
      }
    },
    [invalidFields],
  );

  const handleFormSubmit = () => {
    const invalidFieldsArr: boolean[] = fields.map(({ fieldConfig }) => {
      const { name, validate } = fieldConfig;

      const value = newRecordData[name];
      const isValid = validate(value);

      if (isValid) return true;

      setInvalidFields((draft) => {
        draft[name] = true;
      });

      showWarningToastMessage(name);
      return false;
    });

    if (invalidFieldsArr.some((valid) => valid === false)) return;

    const toastId: Id = toast.loading('Please wait...');

    addNewRecordFunc(newRecordData).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);

      if (status !== 'error') setNewRecordData(newRecordDataConfig);
    });
  };

  return (
    <tr className="add-new-record">
      {fields.map((field: FieldInfo, index: number) => {
        const { tagName, fieldConfig } = field;
        const errorClass = invalidFields[fieldConfig.name]
          ? 'error'
          : undefined;

        const buttons: JSX.Element | null =
          index === fields.length - 1 ? (
            <div className="buttons" onClick={handleFormSubmit}>
              <button className="submit-btn btn">
                <SVG_Add />
              </button>
            </div>
          ) : null;

        return (
          <td key={index} className={errorClass}>
            {tagName === 'input' ? (
              <CustomInput
                {...(fieldConfig as InputFieldInfo)}
                value={newRecordData[fieldConfig.name]}
                changeEventFunc={(value: string) =>
                  handleFieldChange(fieldConfig.name, value)
                }
              />
            ) : (
              <CustomSelect
                {...(fieldConfig as SelectedFieldInfo)}
                value={newRecordData[fieldConfig.name]}
                changeEventFunc={(value: string) =>
                  handleFieldChange(fieldConfig.name, value)
                }
              />
            )}
            {buttons}
          </td>
        );
      })}
    </tr>
  );
}

export default CreateNewRecord;

function createConfig(fields: FieldInfo[]) {
  const result = fields.reduce(
    (config, field) => {
      const { fieldConfig } = field;
      const { name, defaultValue } = fieldConfig;

      config[name] = defaultValue || '';

      return config;
    },
    {} as { [key: string]: string },
  );

  return result;
}
