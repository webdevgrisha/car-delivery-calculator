import { useEffect, useState } from 'react';
import {
  AdditionalServicesSettings,
  CalculationResultSettings,
  ExchangeSettings,
} from '.';
import CalculatorConfigurationPicker from '../CalculatorConfigurationPicker/CalculatorConfigurationPicker';
import { getCalculatorConfigurations } from '../../services/firebase/functions';
import {
  CalculatorConfiguration,
  DEFAULT_CALCULATOR_CONFIGURATION,
} from '../../services/calculatorConfigurations';
import './CalculatorSettings.css';

function CalculatorSettings() {
  const [configurations, setConfigurations] = useState<
    CalculatorConfiguration[]
  >([DEFAULT_CALCULATOR_CONFIGURATION]);
  const [configurationId, setConfigurationId] = useState('default');

  useEffect(() => {
    getCalculatorConfigurations().then(({ data }) => {
      const result = data as { configurations?: CalculatorConfiguration[] };
      if (result.configurations) setConfigurations(result.configurations);
    });
  }, []);

  const handleCreated = (configuration: CalculatorConfiguration) => {
    setConfigurations((current) => [...current, configuration]);
    setConfigurationId(configuration.id);
  };

  return (
    <div className="calculator-settings-page">
      <CalculatorConfigurationPicker
        configurations={configurations}
        value={configurationId}
        onChange={setConfigurationId}
        onCreated={handleCreated}
        variant="settings"
      />
      <div className="calculator calculator-settings">
        <div className="colum-wrapper">
          <CalculationResultSettings configurationId={configurationId} />
          <AdditionalServicesSettings configurationId={configurationId} />
        </div>
        <div className="colum-wrapper">
          <ExchangeSettings />
        </div>
      </div>
    </div>
  );
}

export default CalculatorSettings;
