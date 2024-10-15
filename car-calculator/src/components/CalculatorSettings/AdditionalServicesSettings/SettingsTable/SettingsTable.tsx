import { ServiceData } from './interfaces';
import RenderRow from './RenderRow/RenderRow';

import './SettingsTable.css';

interface SettingsTableProps {
  services: ServiceData[];
  handleFieldChange: (
    id: string,
    name: string,
    value: string | boolean,
  ) => void;
  handleServiceDelete: (id: string) => void;
}

function SettingsTable({
  services,
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
        {services.map((serive) => {
          return (
            <RenderRow
              key={serive.service_id}
              {...serive}
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
