import { CalculatorSettingsTable, InfoRow } from "./interfaces";
import { Draft } from "immer";
import { createRowAction, deleteRowAction, editRowAction, moveRowAction } from "./tableActionFunctions";
import { Action } from "./types";


export default function tableReducer(draft: Draft<CalculatorSettingsTable
>, action: Action) {
    const { type } = action;

    switch (type) {
        case 'init':
            {
                const { initRows } = action;

                // console.log('init: ', initRows);
                Object.assign(draft, initRows);
                break;
            }
        case 'edit':
            {
                const { rowId, rowName, newValue, rowType, servicesAction } = action;

                if (rowType === 'info') {
                    const infoRow = draft.info[rowId];
                    if (rowName in infoRow) infoRow[rowName] = newValue;
                } else {
                    const resultRow = draft.result;

                    if (rowName in resultRow.rowData) resultRow.rowData[rowName] = newValue;
                }

                editRowAction(servicesAction, rowId, rowName, newValue);
            }
            break;
        case 'add':
            {
                const { rowId, servicesAction } = action;

                const rowData: InfoRow = {
                    rowType: 'info',
                    rowName: '',
                    currency: 'PLN',
                    formula: '0',
                    isShown: true,
                };

                draft.info[rowId] = rowData;

                draft.order.rowData.rowsOrder.push(rowId);

                createRowAction(servicesAction, rowId, rowData);
            };
            break;
        case 'delete':
            {
                const { rowId, servicesAction } = action;

                delete draft.info[rowId]

                const rowIndex = draft.order.rowData.rowsOrder.findIndex((id) => id === rowId);
                draft.order.rowData.rowsOrder.splice(rowIndex, 1);

                deleteRowAction(servicesAction, rowId);
            };
            break;
        case 'move':
            {
                const { newRowsOrder } = action;

                draft.order.rowData.rowsOrder = newRowsOrder;
            };
            break;

        case 'save':
            {
                const { orderRowId, newRowsOrder, servicesAction } = action;

                moveRowAction(servicesAction, orderRowId, newRowsOrder);
            };
            break;
    }
}