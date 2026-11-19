import { useEffect, useRef, useState } from 'react';
import { getCalculatorSettingsData } from '../../services/firebase/functions';
import './Calculator.css';

import {
  AutoCalculation,
  Exchange,
  CalculationResultSection,
  TotalSum,
  ManualCalculation,
  AdditionalServices,
  VehicleData,
} from './index';
import Loader from '../Loader/Loader';
import {
  CalculationResultSectionData,
  CarData,
  ClalculationResult,
  Currency,
  RowData,
  SelectedAdditionalServices,
} from './interfaces';
import { toast } from 'react-toastify';
import { getFirstTableRecord } from '../../services/firebase/firestoreDb';
import { useImmer } from 'use-immer';
import createJPG from './createJPG';
import CalculatorConfigurationPicker from '../CalculatorConfigurationPicker/CalculatorConfigurationPicker';
import { getCalculatorConfigurations } from '../../services/firebase/functions';
import {
  CalculatorConfiguration,
  calculatorConfigurationTablePath,
  DEFAULT_CALCULATOR_CONFIGURATION,
} from '../../services/calculatorConfigurations';

const emptyCalculationResultSectionData = (): CalculationResultSectionData => ({
  auction_and_shipping: [],
  customs_clearance: [],
  other_payments: [],
  total_car_cost: 'PLN',
});

function Calculator() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [configurations, setConfigurations] = useState<
    CalculatorConfiguration[]
  >([DEFAULT_CALCULATOR_CONFIGURATION]);
  const [configurationId, setConfigurationId] = useState('default');
  const [calculationResultSectionData, setCalculationResultSectionData] =
    useState<CalculationResultSectionData>(emptyCalculationResultSectionData);
  const jpgBlock = useRef<HTMLDivElement>(null);

  const [calculationResult, setCalculationResult] =
    useState<ClalculationResult>([]);

  const [selectedAdditionalServices, setSelectedAdditionalServices] =
    useImmer<SelectedAdditionalServices>({});

  const [carData, setCarData] = useState<null | CarData>(null);

  useEffect(() => {
    getCalculatorConfigurations().then(({ data }) => {
      const result = data as { configurations?: CalculatorConfiguration[] };
      if (result.configurations) setConfigurations(result.configurations);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setCalculationResult([]);
    setSelectedAdditionalServices({});
    const dataPromiseArr = [
      getCalculatorSettingsData({
        tableName: 'auction_and_shipping',
        configurationId,
      }),
      getCalculatorSettingsData({
        tableName: 'customs_clearance',
        configurationId,
      }),
      getCalculatorSettingsData({
        tableName: 'other_payments',
        configurationId,
      }),
      getFirstTableRecord(
        calculatorConfigurationTablePath(configurationId, 'total_car_cost'),
      ),
    ];

    Promise.all(dataPromiseArr).then((sectionsData) => {
      const nextSectionData = emptyCalculationResultSectionData();
      const tableNames: string[] = Object.keys(nextSectionData);

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
            nextSectionData[tableNames[index]] = sectionData.tableRows;
          } else if ('currency' in sectionData) {
            nextSectionData[tableNames[index]] = sectionData.currency;
          }
        });

        setCalculationResultSectionData(nextSectionData);
        setIsLoading(false);
      } catch (err) {
        toast.error(
          `Error happend, try to reload page, ${(err as Error).message}`,
        );
      }
    });
  }, [configurationId, setSelectedAdditionalServices]);

  return (
    <div className="calculator-page">
      <CalculatorConfigurationPicker
        configurations={configurations}
        value={configurationId}
        onChange={setConfigurationId}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="calculator">
          <div ref={jpgBlock} className="foto-wrapper">
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
                    rows={
                      calculationResultSectionData.customs_clearance as RowData[]
                    }
                    sectionResult={calculationResult[1] || null}
                  />
                  <CalculationResultSection
                    title="Inne płatności"
                    rows={
                      calculationResultSectionData.other_payments as RowData[]
                    }
                    sectionResult={calculationResult[2] || null}
                    selectedAdditionalServices={selectedAdditionalServices}
                  />
                </div>
                <TotalSum
                  title="Całkowity koszt samochodu:"
                  currency={
                    calculationResultSectionData.total_car_cost as Currency
                  }
                  totalResult={calculationResult[3] || null}
                />
              </section>
              <Exchange />
            </div>
            {carData && (
              <div className="column-wrapper">
                <VehicleData {...carData} />
              </div>
            )}
          </div>
          <div className="colum-wrapper second">
            <AutoCalculation setCarData={setCarData} />
            <ManualCalculation
              setCalculationResult={setCalculationResult}
              selectedAdditionalServices={selectedAdditionalServices}
              createJPG={() => createJPG(jpgBlock.current)}
              auction={carData?.auction}
              location={carData?.location}
              configurationId={configurationId}
            />
            <AdditionalServices
              setSelectedAdditionalServices={setSelectedAdditionalServices}
              configurationId={configurationId}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;
