export interface CalculatorConfiguration {
  id: string;
  name: string;
}

export const DEFAULT_CALCULATOR_CONFIGURATION: CalculatorConfiguration = {
  id: 'default',
  name: 'Default',
};

export function calculatorConfigurationTablePath(
  configurationId: string,
  tableName: string,
) {
  return configurationId === DEFAULT_CALCULATOR_CONFIGURATION.id
    ? tableName
    : `calculator_configurations/${configurationId}/${tableName}`;
}
