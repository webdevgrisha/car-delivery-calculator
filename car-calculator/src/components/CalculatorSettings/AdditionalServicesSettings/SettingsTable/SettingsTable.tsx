import { useAdditionaServiceTableContext } from '../AdditionaServiceTableContext';
import RenderRow from './RenderRow/RenderRow';

import './SettingsTable.css';

function SettingsTable() {
  const { tableRows: services } = useAdditionaServiceTableContext();

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
          <th>{/* <p>{tableName}</p> */}</th>
          <th>
            <p>Currency</p>
          </th>
          <th>
            <p>Base Currency</p>
          </th>
          <th>
            <p>Cost price</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="spacer-row" key="gap-row">
          <td colSpan={4}></td>
        </tr>
        {services.map(({ id, rowData: service }) => {
          const isErrorRow: boolean = Boolean(service.error);

          return (
            <RenderRow
              key={id}
              isError={isErrorRow}
              serviceId={id}
              {...service}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default SettingsTable;
