import { useImmerReducer } from 'use-immer';
import { TableWrapperContext } from './tableWrapperContext';
import CalcaulationResultTable from './CalcaulationResultTable/CalcaulationResultTable';
import {
  CalculatorSettingsTable,
  EditActionData,
  HandleFieldChange,
  InfoRow,
  InitActionData,
  ResultRow,
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
import { ShowModalFunc } from '../interfaces';
import { calculatorConfigurationTablePath } from '../../../../services/calculatorConfigurations';

interface TableWrapperProps {
  tableName: string;
  tablePath: string;
  showModal: ShowModalFunc;
  configurationId: string;
}

const tableRowsInitConfig: CalculatorSettingsTable = {
  info: {},
  result: {
    id: '',
    rowData: {
      rowName: '',
      rowType: 'result',
      currency: 'USD',
    },
  },
  order: {
    id: '',
    rowData: {
      rowsOrder: [],
      rowType: 'order',
    },
  },
};

function TableWrapper({ tableName, tablePath, showModal, configurationId }: TableWrapperProps) {
  const [tableRows, dispatch] = useImmerReducer<
    CalculatorSettingsTable,
    Action
  >(tableReducer, tableRowsInitConfig);
  const tableAction = useRef<TableAction>({});

  useEffect(() => {
    tableAction.current = {};
    const unsubscrive = subscribeOnTableSettingsUpdate(
      calculatorConfigurationTablePath(configurationId, tablePath),
      (initRows: CalculatorSettingsTable) => {
        dispatch({ type: 'init', initRows: initRows } as InitActionData);
      },
    );

    return unsubscrive;
  }, [configurationId, dispatch, tablePath]);

  console.log('table rows: ', tableRows);

  const handleFieldChange: HandleFieldChange = (id, name, value, rowType) => {
    dispatch({
      type: 'edit',
      rowId: id,
      rowName: name,
      rowType: rowType,
      newValue: value,
      servicesAction: tableAction.current,
    } as EditActionData<InfoRow | ResultRow>);
  };

  const handleServiceDelete = (id: string): void => {
    dispatch({
      type: 'delete',
      rowId: id,
      servicesAction: tableAction.current,
    });
  };

  const handleAddRow = async () => {
    const serviceId = await generateRowId(
      calculatorConfigurationTablePath(configurationId, tablePath),
    );
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
      configurationId,
      tableAction: Object.values(tableAction.current),
    }).then((response) => {
      const data = response.data as { message?: string; error?: string };
      const status = data.message ? 'success' : 'error';

      const message: string = data.message || data.error || 'Unknown error';

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
    showModal,
  };

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
