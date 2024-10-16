import { InvalidServicesIds, ServiceData } from './interfaces';
import RenderRow from './RenderRow/RenderRow';

import './SettingsTable.css';

interface SettingsTableProps {
  services: ServiceData[];
  invalidServicesIds: InvalidServicesIds;
  handleFieldChange: <K extends keyof ServiceData['rowData']>(
    id: string,
    name: K,
    value: ServiceData['rowData'][K],
  ) => void;
  handleServiceDelete: (id: string) => void;
}

function SettingsTable({
  services,
  invalidServicesIds,
  handleFieldChange,
  handleServiceDelete,
}: SettingsTableProps) {
  return (
    <table>
      <colgroup>
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th>
            <p>Currency</p>
          </th>
          <th>
            <p>Cost price</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {services.map(({ id, rowData: service }) => {
          const isErrorRow: boolean = !!invalidServicesIds[id];
          return (
            <RenderRow
              key={id}
              isError={isErrorRow}
              service_id={id}
              {...service}
              handleFieldChange={handleFieldChange}
              handleServiceDelete={handleServiceDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default SettingsTable;
