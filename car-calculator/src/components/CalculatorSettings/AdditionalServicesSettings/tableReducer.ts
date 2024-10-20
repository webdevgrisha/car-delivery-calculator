import { RowData, ServiceData } from "./interfaces";
import { Draft } from "immer";
import { createServiceAction, deleteServiceAction, editServiceAction } from "./tableActionFunctions";
import { Action } from "./types";


export default function tableReducer(draft: Draft<ServiceData[]>, action: Action) {
    const { type } = action;

    switch (type) {
        case 'init':
            {
                const { initServices } = action;

                draft.splice(0, draft.length, ...initServices);
                break;
            }
        case 'edit':
            {
                const { rowId, rowName, newValue, servicesAction } = action;

                const serviceIndex = draft.findIndex((service) => service.id === rowId);

                if (serviceIndex === -1) return;

                const service = draft[serviceIndex];

                service.rowData[rowName] = newValue;

                if ('error' in service.rowData && service.rowData.error) service.rowData.error = false;

                editServiceAction(servicesAction, rowId, rowName, newValue);
            }
            break;
        case 'add':
            {
                const { rowId, servicesAction } = action;

                const rowData: RowData = {
                    rowName: '',
                    currency: 'PLN',
                    price: '0',
                    isShown: true,
                };

                const config: ServiceData = {
                    id: rowId,
                    rowData,
                };

                draft.push(config);

                createServiceAction(servicesAction, rowId, rowData);
            };
            break;
        case 'delete':
            {
                const { rowId, servicesAction } = action;

                const serviceIndex = draft.findIndex((service) => service.id === rowId);

                if (serviceIndex !== -1) {
                    draft.splice(serviceIndex, 1);
                }

                deleteServiceAction(servicesAction, rowId);
            };
            break;
        case 'save':
            {
                draft.forEach(
                    (service) => {
                        const isInvalid = +service.rowData.price < 0 || service.rowData.price === '';

                        if (isInvalid) service.rowData.error = true;
                    }
                );
            };
            break;
    }
}