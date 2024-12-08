import { useEffect, useState } from 'react';
import { getCalculatorSettingsData } from '../../services/firebase/functions';
import './Calculator.css';

import {
  AutoCalculation,
  Exchange,
  CalculationResultSection,
  TotalSum,
  ManualCalculation,
  AdditionalServices,
} from './index';
import Loader from '../Loader/Loader';
import {
  CalculationResultSectionData,
  ClalculationResult,
  Currency,
  RowData,
  SelectedAdditionalServices,
} from './interfaces';
import { toast } from 'react-toastify';
import { getFirstTableRecord } from '../../services/firebase/firestoreDb';
import { useImmer } from 'use-immer';

const calculationResultSectionData: CalculationResultSectionData = {
  auction_and_shipping: [],
  customs_clearance: [],
  other_payments: [],
  total_car_cost: 'PLN',
};

function Calculator() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [calculationResult, setCalculationResult] =
    useState<ClalculationResult>([]);

  const [selectedAdditionalServices, setSelectedAdditionalServices] =
    useImmer<SelectedAdditionalServices>({});

  useEffect(() => {
    const dataPromiseArr = [
      getCalculatorSettingsData({
        tableName: 'auction_and_shipping',
      }),
      getCalculatorSettingsData({
        tableName: 'customs_clearance',
      }),
      getCalculatorSettingsData({
        tableName: 'other_payments',
      }),
      getFirstTableRecord('total_car_cost'),
    ];

    Promise.all(dataPromiseArr).then((sectionsData) => {
      const tableNames: string[] = Object.keys(calculationResultSectionData);

      try {
        sectionsData.forEach(({ data }, index) => {
          if (data && typeof data === 'object' && 'error' in data) {
            throw new Error(data.error as string);
          }

          console.log('data: ', data);

          const sectionData = data as
            | { tableRows: RowData[] }
            | { currency: Currency };

          if ('tableRows' in sectionData) {
            calculationResultSectionData[tableNames[index]] =
              sectionData.tableRows;
          } else if ('currency' in sectionData) {
            calculationResultSectionData[tableNames[index]] =
              sectionData.currency;
          }
        });

        setIsLoading(false);
      } catch (err) {
        toast.error(
          `Error happend, try to reload page, ${(err as Error).message}`,
        );
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="calculator">
      <div className="colum-wrapper">
        <section className="calculation-result">
          <div className="container">
            <header>
              <img src="./logo-black.png" alt="logo" />
            </header>
            <CalculationResultSection
              title="Aukcja i wysyłka"
              rows={
                calculationResultSectionData.auction_and_shipping as RowData[]
              }
              sectionResult={calculationResult[0] || null}
            />
            <CalculationResultSection
              title="Odprawa celna"
              rows={calculationResultSectionData.customs_clearance as RowData[]}
              sectionResult={calculationResult[1] || null}
            />
            <CalculationResultSection
              title="Inne płatności"
              rows={calculationResultSectionData.other_payments as RowData[]}
              sectionResult={calculationResult[2] || null}
              selectedAdditionalServices={selectedAdditionalServices}
            />
          </div>
          <TotalSum
            title="Całkowity koszt samochodu:"
            currency={calculationResultSectionData.total_car_cost as Currency}
            totalResult={calculationResult[3] || null}
          />
        </section>
        <Exchange />
      </div>
      <div className="colum-wrapper">
        <AutoCalculation />
        <ManualCalculation
          setCalculationResult={setCalculationResult}
          selectedAdditionalServices={selectedAdditionalServices}
        />
        <AdditionalServices
          setSelectedAdditionalServices={setSelectedAdditionalServices}
        />
      </div>
    </div>
  );
}

export default Calculator;
