export const DEFAULT_CONFIGURATION_ID = "default";

export const CONFIGURATION_TABLES = [
  "auction_and_shipping",
  "customs_clearance",
  "other_payments",
  "total_car_cost",
  "additional_services",
] as const;

export type ConfigurationTable = typeof CONFIGURATION_TABLES[number];

export function isConfigurationTable(
  value: string
): value is ConfigurationTable {
  return CONFIGURATION_TABLES.includes(value as ConfigurationTable);
}

export function configurationCollectionPath(
  configurationId: string | undefined,
  tableName: ConfigurationTable
): string {
  if (!configurationId || configurationId === DEFAULT_CONFIGURATION_ID) {
    return tableName;
  }

  if (!/^[^/]{1,200}$/.test(configurationId)) {
    throw new Error("Invalid calculator configuration id");
  }

  return `calculator_configurations/${configurationId}/${tableName}`;
}
