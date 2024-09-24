import { useCallback, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { SVG_Add } from '../../../assets';

import './CreateNewRecord.css';
import { CustomInput, CustomSelect } from '..';
import { FieldInfo, InputFieldInfo, SelectedFieldInfo } from '../interfaces';

interface CreateNewRecordProps {
  fields: FieldInfo[];
  submitFunction: Function;
}

function CreateNewRecord({ fields }: CreateNewRecordProps) {
  const newRecordDataConfig = useMemo(
    () =>
      fields.reduce<Record<string, string>>((config, field) => {
        const fieldConfig = field.fieldConfig;
        const key = fieldConfig.name;
        const value = fieldConfig.defaultValue;

        config[key] = value;

        return config;
      }, {}),
    [fields],
  );

  // refactor
  const newRecordValidateFunc = useMemo(
    () =>
      fields.reduce<Record<string, Function>>((config, field) => {
        const fieldConfig = field.fieldConfig;
        const key = fieldConfig.name;
        const value = fieldConfig.validateFunction;

        config[key] = value;

        return config;
      }, {}),
    [fields],
  );

  const [newRecordData, setNewRecordData] =
    useImmer<Record<string, string>>(newRecordDataConfig);

  const [invalidFields, setInvalidFields] = useImmer<Record<string, boolean>>(
    {},
  );

  console.log('fields: ', fields);

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
    console.log('Add new record');

    const invalidFieldsArr: boolean[] = Object.entries(
      newRecordValidateFunc,
    ).map(([name, func]) => {
      const value = newRecordData[name];
      const isValid = func(value);

      if (isValid) return true;

      setInvalidFields((draft) => {
        draft[name] = true;
      });

      return false;
    });

    console.log('unValidFields:', invalidFieldsArr);
  };

  console.log('newRecordData:', newRecordData);

  return (
    <tr className="add-new-record">
      {fields.map((field: FieldInfo, index: number) => {
        const { tagName, fieldConfig } = field;

        const errorClass = invalidFields[fieldConfig.name] ? 'error' : '';

        console.log('errorClass: ', errorClass);

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
                changeEventFunc={(value: string) =>
                  handleFieldChange(fieldConfig.name, value)
                }
              />
            ) : (
              <CustomSelect
                {...(fieldConfig as SelectedFieldInfo)}
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
