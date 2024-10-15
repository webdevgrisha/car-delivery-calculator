import AdditionalServicesSettings from './AdditionalServicesSettings/AdditionalServicesSettings';
import './CalculatorSettings.css';

function CalculatorSettings() {
  return (
    <div className="calculator calculator-settings">
      <div className="colum-wrapper">
        <AdditionalServicesSettings />
      </div>
      <div className="colum-wrapper">
        {/* <AdditionalServicesSettings /> */}
      </div>
    </div>
  );
}

export default CalculatorSettings;
