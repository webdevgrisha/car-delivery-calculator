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
  Currency,
  RowData,
} from './interfaces';
import { toast } from 'react-toastify';
import { getFirstTableRecord } from '../../services/firebase/firestoreDb';

// const firstSubSection = [
//   'Cena samochodu na aukcji',
//   'Prowizja aukcyjna',
//   'Koszt wysyłki do portu w USA',
//   'Koszt transportu morskiego do portu w Bremerhaven',
//   'Prowizja naszej firmy',
//   'Suma aukcyjna i wysyłka:',
// ];

// const secondSubSection = [
//   'Cło',
//   'VAT',
//   'Akcyza',
//   'Agencja celna i rozładunek',
//   'Suma opłat celnych:',
// ];

// const thirdSubSection = ['Transport do domu', 'Inne płatności:'];

const currencyPairs = [
  { baseCode: 'USD', targetCode: 'PLN' },
  { baseCode: 'USD', targetCode: 'EUR' },
];

const calculationResultSectionData: CalculationResultSectionData = {
  auction_and_shipping: [],
  customs_clearance: [],
  other_payments: [],
  total_car_cost: 'PLN',
};

function Calculator() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      console.log('sectionsData: ', sectionsData);
      try {
        sectionsData.forEach(({ data }, index) => {
          if ('error' in data) throw Error(data.error);

          console.log('data: ', data);
          calculationResultSectionData[tableNames[index]] =
            (data.tableRows as RowData) || (data.currency as Currency);
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

  console.log('calculationResultSectionData: ', calculationResultSectionData);
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
            />
            <CalculationResultSection
              title="Odprawa celna"
              rows={calculationResultSectionData.customs_clearance as RowData[]}
            />
            <CalculationResultSection
              title="Inne płatności"
              rows={calculationResultSectionData.other_payments as RowData[]}
            />
          </div>
          <TotalSum
            title="Całkowity koszt samochodu:"
            currency={calculationResultSectionData.total_car_cost as Currency}
          />
        </section>
        <Exchange />
      </div>
      <div className="colum-wrapper">
        <AutoCalculation />
        <ManualCalculation />
        <AdditionalServices />
      </div>
    </div>
  );
}

export default Calculator;
