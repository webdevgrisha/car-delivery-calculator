import { useImmer } from 'use-immer';
import { useTableSubscriptiontsts } from '../../../../hooks';
import { TableWrapperContext } from './tableWrapperContext';
import CalcaulationResultTable from './CalcaulationResultTable/CalcaulationResultTable';
import { TableContext, TableRow } from './interfaces';

import './TableWrapper.css';

interface TableWrapperProps {
  tableName: string;
  tablePath: string;
}

function TableWrapper({ tableName, tablePath }: TableWrapperProps) {
  const [tableRows, setTableRows] = useImmer<TableRow[]>([]);

  useTableSubscriptiontsts(tablePath, 'rowName', setTableRows);

  const tableWrapperContextValue: TableContext = {
    tableName: tableName,
    tableRows: tableRows,
    deleteRecordFunc: undefined,
    editRecordFunc: undefined
  };

  return (
      <div className="table-wrapper-container">
        <TableWrapperContext.Provider value={tableWrapperContextValue}>
          <CalcaulationResultTable />
        </TableWrapperContext.Provider>
        <footer>
          <button className="btn add">
            {/* <button className="btn add" onClick={handleAddField}> */}
            Add Field
          </button>
          <button className="btn save">
            {/* <button className="btn save" onClick={handleSaveCahnge}> */}
            Save
          </button>
        </footer>
      </div>
  );
}

export default TableWrapper;
