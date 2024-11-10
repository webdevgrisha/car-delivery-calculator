import { useImmer } from 'use-immer';
import './ManualCalculation.css';
import getFormFields from './fieldsConfig';
import { FormRows, FormData } from './interface';
import { ManualRow } from '.';
import { RowNames } from './types';
import { FormEvent, useState } from 'react';
import { showWarningToastMessage } from '../../CustomTable/tableToast';
import { calculateRowsData } from '../../../services/firebase/functions';
import { ClalculationResult } from '../interfaces';

interface ManualCalculationProps {
  setCalculationResult: (value: ClalculationResult) => void;
}

function ManualCalculation({ setCalculationResult }: ManualCalculationProps) {
  const [formData, setFormData] = useImmer<FormData>({
    auction: '',
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

  const [formFields] = useState<FormRows[]>(() => getFormFields());

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
        const formRow = formFields.find((row) => row.name === name)!;
        const validate = formRow.validate;

        const isValid = validate(value);

        if (isValid) return null;

        showWarningToastMessage(name);

        return [name, true];
      })
      .filter((value) => value !== null);

    setInValidFields(Object.fromEntries(inValidFields));

    if (inValidFields.length) return;

    console.log({ variables: formData });

    calculateRowsData({ variables: formData }).then(({ data }) => {
      console.log(data);
      setCalculationResult(data as ClalculationResult);
    });
  };

  return (
    <section className="manual-calculation">
      <div className="container">
        <header>
          <h5>Manual calculation</h5>
        </header>
        <form onSubmit={submitForm}>
          {formFields.map((rowConfig) => {
            const { name } = rowConfig;
            const isError: boolean = !!inValidFields[name];

            return (
              <ManualRow
                key={name}
                {...rowConfig}
                isError={isError}
                value={formData[name]}
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
