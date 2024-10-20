import './CalcaulationResultTable.css';
import { useTableWrapperContext } from '../tableWrapperContext';
import RenderInfoRow from './RenderInfoRow/RenderInfoRow';
import RenderResultRow from './RenderResultRow/RenderResultRow';

function SettingsTable() {
  const { tableName, tableRows } = useTableWrapperContext();

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
          <th>
            <p>{tableName}</p>
          </th>
          <th>
            <p>Currency</p>
          </th>
          <th>
            <p>Cost price</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {tableRows.map(({ id, rowData }) => {
          if (rowData.rowType === 'info') {
            return (
              <RenderInfoRow
                key={id}
                rowId={id}
                rowName={rowData.rowName}
                currency={rowData.currency}
                formula=""
                isShown={rowData.isShown}
              />
            );
          }
          return (
            <RenderResultRow
              key={id}
              rowId={id}
              rowName={rowData.rowName}
              currency={rowData.currency}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default SettingsTable;
