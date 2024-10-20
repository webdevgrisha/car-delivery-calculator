import AdditionalServicesSettings from './AdditionalServicesSettings/AdditionalServicesSettings';
import CalculationResultSettings from './CalculationResultSettings/CalculationResultSettings';
import './CalculatorSettings.css';

function CalculatorSettings() {
  return (
    <div className="calculator calculator-settings">
      <div className="colum-wrapper">
        <CalculationResultSettings />
        <AdditionalServicesSettings />
      </div>
      <div className="colum-wrapper">
        {/* <AdditionalServicesSettings /> */}
      </div>
    </div>
  );
}

export default CalculatorSettings;
