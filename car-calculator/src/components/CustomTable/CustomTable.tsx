import { useState, useMemo, useRef, useCallback } from 'react';
import './CustomTable.css';
import { useImmer } from 'use-immer';
import inputMax from 'react-phone-number-input/input-max';
import React from 'react';

import { SVG_Plus_icon } from '../../assets';

type InputFiledType = 'text' | 'number' | 'email';

interface InputFieldInfo {
  name: string;
  defaultValue: string;
  placeholder: string;
  type?: InputFiledType;
  isRequired?: boolean;
  validateFunction: (input: string | number) => boolean;
}

interface SelectedFieldInfo {
  name: string;
  defaultValue: string;
  selectionOptions: string[];
  isRequired?: boolean;
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

interface CreateNewRecordProps {
  fields: FieldInfo[];
  submitFunction: Function;
}

interface RenderInputProps {
  name: string;
  defaultValue: string;
  placeholder?: string;
  type?: InputFiledType;
  isRequired?: boolean;
  changeEventFunc: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => void;
}

interface RenderSelectProps {
  name: string;
  defaultValue: string;
  selectionOptions: string[];
  isRequired?: boolean;
  changeEventFunc: (
    e: React.ChangeEvent<HTMLSelectElement>,
    name: string,
  ) => void;
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

function RenderInput({
  name,
  defaultValue,
  placeholder,
  type,
  isRequired,
  changeEventFunc,
}: RenderInputProps) {
  console.log('rerender!!!');

  return (
    <input
      type={type || 'text'}
      name={name}
      placeholder={placeholder || ''}
      required={isRequired || false}
      defaultValue={defaultValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        changeEventFunc(e, name)
      }
    />
  );
}

function RenderSelect({
  name,
  defaultValue,
  selectionOptions,
  isRequired,
  changeEventFunc,
}: RenderSelectProps) {
  return (
    <select
      name={name}
      required={isRequired || false}
      defaultValue={defaultValue}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        changeEventFunc(e, name)
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

  const [unValidFileds, setUnValidFileds] = useImmer<Record<string, boolean>>(
    {},
  );

  console.log('fields: ', fields);

  const handleFiledChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      name: string,
    ) => {
      const value = e.target.value;
      setNewRecordData((draft) => {
        draft[name] = value;
      });

      if (unValidFileds[name]) {
        setUnValidFileds((draft) => {
          draft[name] = false;
        });
      }
    },
    [unValidFileds],
  );

  const handleFormSubmit = () => {
    console.log('Add new record');

    const unValidFileds: boolean[] = Object.entries(newRecordValidateFunc).map(
      ([name, func]) => {
        const value = newRecordData[name];
        const isValid = func(value);

        if (isValid) return true;

        setUnValidFileds((draft) => {
          draft[name] = true;
        });

        return false;
      },
    );

    console.log('unValidFileds:', unValidFileds);
  };

  console.log('newRecordData:', newRecordData);

  return (
    <tr className="add-new-record">
      {fields.map((field: FieldInfo, index: number) => {
        const { tagName, fieldConfig } = field;

        const errorClass = unValidFileds[fieldConfig.name] ? 'error' : '';

        console.log('errorClass: ', errorClass);

        const buttons: JSX.Element | null =
          index === fields.length - 1 ? (
            <div className="buttons" onClick={handleFormSubmit}>
              <button className="submit-btn btn">
                <SVG_Plus_icon />
              </button>
            </div>
          ) : null;

        return (
          <td key={index} className={errorClass}>
            {tagName === 'input' ? (
              <RenderInput
                {...(fieldConfig as InputFieldInfo)}
                changeEventFunc={handleFiledChange}
              />
            ) : (
              <RenderSelect
                {...(fieldConfig as SelectedFieldInfo)}
                changeEventFunc={handleFiledChange}
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
