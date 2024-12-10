import { AdditionalServicesSettings, CalculationResultSettings, ExchangeSettings } from '.';
import './CalculatorSettings.css';

function CalculatorSettings() {
  return (
    <div className="calculator calculator-settings">
      <div className="colum-wrapper">
        <CalculationResultSettings />
        <AdditionalServicesSettings />
      </div>
      <div className="colum-wrapper">
        <ExchangeSettings />
      </div>
    </div>
  );
}

export default CalculatorSettings;
