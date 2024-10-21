import { useImmerReducer } from 'use-immer';
import { TableWrapperContext } from './tableWrapperContext';
import CalcaulationResultTable from './CalcaulationResultTable/CalcaulationResultTable';
import {
  CalculatorSettingsTable,
  HandleFieldChange,
  InitActionData,
  TableContext,
} from './interfaces';

import './TableWrapper.css';
import { Action, TableAction } from './types';
import tableReducer from './tableReducer';
import { useEffect, useRef } from 'react';
import {
  generateRowId,
  subscribeOnTableSettingsUpdate,
} from '../../../../services/firebase/firestoreDb';
import { updateCalculatorSettingsData } from '../../../../services/firebase/functions';
import { showUpdateToast } from '../../../CustomTable/tableToast';
import { Id, toast } from 'react-toastify';
import { moveRowAction } from './tableActionFunctions';

interface TableWrapperProps {
  tableName: string;
  tablePath: string;
}

const tableRowsInitConfig: CalculatorSettingsTable = {
  info: {},
  result: {
    id: '',
    rowData: {
      rowName: '',
    },
  },
  order: {
    rowData: {
      rowsOrder: [],
    },
  },
};

function TableWrapper({ tableName, tablePath }: TableWrapperProps) {
  const [tableRows, dispatch] = useImmerReducer<
    CalculatorSettingsTable,
    Action
  >(tableReducer, tableRowsInitConfig);
  const tableAction = useRef<TableAction>({});

  useEffect(() => {
    const unsubscrive = subscribeOnTableSettingsUpdate(
      tablePath,
      (initRows: CalculatorSettingsTable) => {
        dispatch({ type: 'init', initRows: initRows } as InitActionData);
      },
    );

    return unsubscrive;
  }, []);

  console.log('table update: ', tableAction);

  const handleFieldChange: HandleFieldChange = (id, name, value, rowType) => {
    dispatch({
      type: 'edit',
      rowId: id,
      rowName: name,
      rowType: rowType,
      newValue: value,
      servicesAction: tableAction.current,
    });
  };

  const handleServiceDelete = (id: string): void => {
    dispatch({
      type: 'delete',
      rowId: id,
      servicesAction: tableAction.current,
    });
  };

  const handleAddRow = async () => {
    const serviceId = await generateRowId(tablePath);
    dispatch({
      type: 'add',
      rowId: serviceId,
      servicesAction: tableAction.current,
    });
  };

  const handleMoveRow = (newRowsOrder: string[]) => {
    console.log('handleMoveRow: ', newRowsOrder);
    dispatch({
      type: 'move',
      newRowsOrder,
      orderRowId: tableRows.order.id,
      servicesAction: tableAction.current,
    });
  };

  const handleSaveCahnge = () => {
    moveRowAction(
      tableAction.current,
      tableRows.order.id,
      tableRows.order.rowData.rowsOrder,
    );

    console.log('tableAction.current: ', tableAction.current);
    const toastId: Id = toast.loading('Please wait...');

    updateCalculatorSettingsData({
      tableName: tablePath,
      tableAction: Object.values(tableAction.current),
    }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);

      tableAction.current = {};
    });
  };

  const tableWrapperContextValue: TableContext = {
    tableName: tableName,
    tableRows: tableRows,
    deleteRecordFunc: handleServiceDelete,
    editRecordFunc: handleFieldChange,
    moveRowsFunc: handleMoveRow,
  };

  // console.log('tableRows: ', tableRows);

  return (
    <div className="table-wrapper-container">
      <TableWrapperContext.Provider value={tableWrapperContextValue}>
        <CalcaulationResultTable />
      </TableWrapperContext.Provider>
      <footer>
        <button className="btn add" onClick={handleAddRow}>
          Add Field
        </button>
        <button className="btn save" onClick={handleSaveCahnge}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default TableWrapper;
