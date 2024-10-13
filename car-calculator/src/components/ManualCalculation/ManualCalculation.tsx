import { useImmer } from 'use-immer';
import './ManualCalculation.css';
import getFormRows from './rowsConfig';
import { FormRows } from './interface';
import { ManualRow } from '.';
import { RowNames } from './types';
import { FormEvent, useState } from 'react';
import { showWarningToastMessage } from '../CustomTable/tableToast';

interface FormData {
  carPrice: string;
  engineSize: string;
  location: string;
  customsCosts: string;
  repairCosts: string;
  carSize: string;
}

function ManualCalculation() {
  const [formData, setFormData] = useImmer<FormData>({
    carPrice: '',
    engineSize: '',
    location: '',
    customsCosts: '',
    repairCosts: '',
    carSize: '',
  });

  const [inValidFields, setInValidFields] = useImmer<Record<string, boolean>>(
    {},
  );

  const [formRows] = useState<FormRows[]>(() => getFormRows());

  console.log('formRows: ', formRows);

  const handleFormDataChange = (name: RowNames, value: string) => {
    if (inValidFields[name]) {
      setInValidFields((draft) => {
        draft[name] = false;
      });
    }

    setFormData((draft) => {
      draft[name] = value;
    });
  };

  const submitForm = (e: FormEvent) => {
    console.log('form submit');

    e.preventDefault();

    const inValidFields = Object.entries(formData)
      .map(([name, value]) => {
        const formRow = formRows.find((row) => row.rowName === name)!;
        const validate = formRow.validate;

        const isValid = validate(value);

        if (isValid) return null;

        showWarningToastMessage(name);

        return [name, true];
      })
      .filter((value) => value !== null);

    setInValidFields(Object.fromEntries(inValidFields));
  };

  return (
    <section className="manual-calculation">
      <div className="container">
        <header>
          <h5>Manual calculation</h5>
        </header>
        <form onSubmit={submitForm}>
          {formRows.map((rowConfig) => {
            const { rowName } = rowConfig;
            const isError: boolean = !!inValidFields[rowName];

            return (
              <ManualRow
                key={rowName}
                {...rowConfig}
                isError={isError}
                rowValue={formData[rowName]}
                handleFormDataChange={handleFormDataChange}
              />
            );
          })}
          <div className="btn-wrapper">
            <button className="save-jpg">Save JPG</button>
            <button type="submit" className="calculate">
              OK
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ManualCalculation;
