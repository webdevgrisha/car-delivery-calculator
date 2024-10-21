import './CalcaulationResultTable.css';
import { useTableWrapperContext } from '../tableWrapperContext';
import RenderInfoRow from './RenderInfoRow/RenderInfoRow';
import RenderResultRow from './RenderResultRow/RenderResultRow';

import { Reorder, AnimatePresence } from 'framer-motion';

function SettingsTable() {
  const { tableName, tableRows, moveRowsFunc } = useTableWrapperContext();

  const { info, result, order } = tableRows;

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
      <Reorder.Group
        as="tbody"
        axys="y"
        values={order.rowData?.rowsOrder || []}
        onReorder={moveRowsFunc}
      >
        <AnimatePresence>
          <tr className="spacer-row" key="gap-row">
            <td colSpan={4}></td>
          </tr>

          {(order.rowData?.rowsOrder || []).map((rowId) => {
            const rowData = info[rowId];

            // как решить проблему с рассинхрном ???
            // без данной строки будет ошибка

            // ошибка происходит так как firestore возврашает данные которрые еще небыли полностью обновленны. updateCalculatorSettings
            // транзакции решат данную проблему ?
            if (!rowData) return null;

            return <RenderInfoRow rowId={rowId} key={rowId} {...rowData} />;
          })}

          {result && (
            <RenderResultRow
              key={result.id}
              rowId={result.id}
              rowName={result.rowData.rowName}
              currency={result.rowData.currency}
            />
          )}
        </AnimatePresence>
      </Reorder.Group>
    </table>
  );
}

export default SettingsTable;
