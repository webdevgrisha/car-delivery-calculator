import { useState, useMemo, useRef } from 'react';
import './CustomTable.css';
import { useImmer } from 'use-immer';
import inputMax from 'react-phone-number-input/input-max';
import React from 'react';

type InputFiledType = 'text' | 'number' | 'email';

interface InputFieldInfo {
  name: string;
  defaultValue: string;
  placeholder: string;
  type: InputFiledType;
  isRequired: boolean;
  validateFunction: (input: string | number) => boolean;
}

interface SelectedFieldInfo {
  name: string;
  defaultValue: string;
  selectionOptions: string[];
  isRequired: boolean;
  validateFunction: (input: string | number) => boolean;
}

interface FieldInfo {
  tagName: 'input' | 'select';
  fieldConfig: InputFieldInfo | SelectedFieldInfo;
}

interface CustomTableProps {
  tableIconPath: string;
  tableName: string;
  tableColumnNames: string[];
  tableFields: FieldInfo[];
}

function CustomTable({
  tableIconPath,
  tableName = '',
  tableColumnNames,
  tableFields,
}: CustomTableProps) {
  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);

  const handleAddNewRecord = () => setShowAddNewRecordFields(true);

  return (
    <section className="table-section">
      <header>
        <div className="icon">
          <img src={`/${tableIconPath}`} alt="table-icon" />
        </div>
        <h2>{tableName}</h2>
        <input type="search" placeholder="Search" />
        <button onClick={handleAddNewRecord}>Add New</button>
      </header>
      <table className="custom-table">
        <thead>
          <tr>
            {tableColumnNames.map((name: string, index: number) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showAddNewRecordFields && (
            <CreateNewRecord fields={tableFields} submitFunction={undefined} />
          )}
          {/* {loading && <Loader />}
          {showAddUserFields && <AddNewUser />}
          <CreateRows users={users} /> */}
        </tbody>
      </table>
    </section>
  );
}

interface CreateNewRecordProps {
  fields: FieldInfo[];
  submitFunction: Function;
}

interface RenderInputProps {
  config: InputFieldInfo;
  index: number;
}

interface RenderSelectProps {
  config: SelectedFieldInfo;
  index: number;
}

function CreateNewRecord({ fields }: CreateNewRecordProps) {
  // const newRecordDataConfig = useMemo(
  //   () =>
  //     fields.reduce<Record<string, string>>((config, field) => {
  //       const fieldConfig = field.fieldConfig;
  //       const key = fieldConfig.name;
  //       const value = fieldConfig.defaultValue;

  //       config[key] = value;

  //       return config;
  //     }, {}),
  //   [fields],
  // );

  const newRecordValidateFunc = useMemo(
    () =>
      fields.map((field: FieldInfo) => {
        return field.fieldConfig.validateFunction;
      }),
    [fields],
  );

  const fieldesdTags = useRef<
    Record<string, HTMLInputElement | HTMLSelectElement>
  >({});

  // const [newRecordData, setNewRecordData] =
  //   useImmer<Record<string, string>>(newRecordDataConfig);

  const [unValidFiledsKeys, setUnValidFiledsKeys] = useState<number[]>([]);

  console.log('fields: ', fields);

  const handleFiledChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string,
    index: number,
  ) => {
    const value = e.target.value;
    // setNewRecordData((draft) => {
    //   draft[name] = value;
    // });

    // console.log('NewRecordData:', newRecordData);

    const resetUnValidFields = unValidFiledsKeys.filter(
      (key: number) => key !== +index,
    );

    console.log(resetUnValidFields);
    setUnValidFiledsKeys(resetUnValidFields);
  };

  const handleFormSubmit = () => {
    console.log('Add new record');
    console.log(
      'Refs: ',
      Object.entries(fieldesdTags.current).map(([key, tag]) => [
        key,
        tag.value,
      ]),
    );

    console.log(newRecordValidateFunc);
    const values = Object.values(fieldesdTags.current).map((tag) => tag.value);
    // const values: string[] = Object.values(newRecordData) as string[];

    const unValidFileds: number[] = newRecordValidateFunc
      .map((func: Function, index: number) => {
        const value = values[index];
        const isValid = func(value);

        if (!isValid) return index;
      })
      .filter((item) => item !== undefined);

    console.log('unValidFileds:', unValidFileds);

    if (unValidFileds.length) {
      setUnValidFiledsKeys(unValidFileds);

      console.log('UnValidFiledsKeys:', unValidFiledsKeys);
      return;
    }
  };

  const RenderInput = ({ config, index }: RenderInputProps) => {
    const { name, placeholder, type, isRequired } = config;

    console.log('rerender!!!');

    return (
      <input
        ref={(el) => (fieldesdTags.current[name] = el as HTMLInputElement)}
        type={type}
        name={name}
        placeholder={placeholder}
        required={isRequired}
        defaultValue={fieldesdTags.current[name].value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFiledChange(e, name, index)
        }
        // value={newRecordData[name] || ''}
      />
    );
  };

  const RenderSelect = ({ config, index }: RenderSelectProps) => {
    const { name, selectionOptions, isRequired } = config;

    return (
      <select
        ref={(el) => (fieldesdTags.current[name] = el as HTMLSelectElement)}
        name={name}
        required={isRequired}
        // value={newRecordData[name]}
        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        //   handleFiledChange(e, name)
        // }
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
  };

  return (
    <tr className="add-new-record">
      {fields.map((field: FieldInfo, index: number) => {
        const { tagName, fieldConfig } = field;

        const errorClass = unValidFiledsKeys.includes(index) ? 'error' : '';
        console.log('errorClasss:', errorClass);
        const buttons: JSX.Element | '' =
          index === fields.length - 1 ? (
            <div className="buttons" onClick={handleFormSubmit}>
              <button className="submit-btn btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    width="23.5"
                    height="23.5"
                    x="0.25"
                    y="0.25"
                    fill="#E3EAFF"
                    stroke="#DFE7F0"
                    stroke-width="0.5"
                    rx="4.75"
                  ></rect>
                  <path
                    fill="#216DD1"
                    d="M12.461 6.462a.462.462 0 1 0-.922 0v5.077H6.462a.462.462 0 1 0 0 .922h5.077v5.077a.461.461 0 1 0 .922 0v-5.077h5.077a.461.461 0 1 0 0-.922h-5.077V6.462Z"
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            ''
          );

        return (
          <td key={index} className={errorClass}>
            {tagName === 'input' ? (
              <RenderInput
                config={fieldConfig as InputFieldInfo}
                index={index}
              />
            ) : (
              <RenderSelect
                config={fieldConfig as SelectedFieldInfo}
                index={index}
              />
            )}
            {buttons}
          </td>
        );
      })}
    </tr>
  );
}

export default CustomTable;
