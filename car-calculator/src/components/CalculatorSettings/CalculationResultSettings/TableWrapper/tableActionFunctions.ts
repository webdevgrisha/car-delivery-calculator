import { CreateEditActionConfig, DeleteActionConfig, RowData } from "./interfaces";
import { TableAction } from "./types";

// стоит ли седать данный файл общим для всех таблиц в данной папке.
function findeServiceAction(servicesAction: TableAction[], id: string) {
    const serviceAction: TableAction | undefined = servicesAction.find(
        (service) => {
            return (
                service.action !== 'delete' &&
                (service as CreateEditActionConfig).id === id
            );
        },
    );

    return serviceAction;
}

function editRowAction<K extends keyof RowData>(
    servicesAction: TableAction[],
    id: string,
    name: K,
    value: RowData[K],
) {
    const serviceAction = findeServiceAction(servicesAction, id) as
        | CreateEditActionConfig
        | undefined;

    console.log('serviceAction: ', serviceAction);
    if (!serviceAction) {
        const config = {
            action: 'edit',
            id: id,
            config: {
                [name]: value,
            } as unknown as RowData,
        };

        servicesAction.push(config as TableAction);
    } else {
        serviceAction.action = 'edit';
        serviceAction.config = {
            ...serviceAction.config,
            [name]: value
        };
    }
}

function deleteRowAction(servicesAction: TableAction[], id: string) {

    const serviceAction: TableAction | undefined = findeServiceAction(
        servicesAction,
        id,
    );

    if (!serviceAction) {
        const config: DeleteActionConfig = {
            action: 'delete',
            id: id,
        };

        servicesAction.push(config);
    } else {
        serviceAction.action = 'delete';
        delete serviceAction.config;
    }
}

function createRowAction(
    servicesAction: TableAction[],
    id: string,
    config: RowData,
) {
    const newConfig = {
        action: 'create',
        id: id,
        config,
    };

    servicesAction.push(newConfig as TableAction);
}

function moveRowAction(
    servicesAction: TableAction[],
    id: string,
    newRowsOrder: string[],
) {
    const reorderAction = servicesAction.find((row) => row.action === 'order');
    if (!reorderAction) {
        const newConfig = {
            action: 'order',
            id: id,
            config: {
                rowsOrder: newRowsOrder,
            }
        };

        servicesAction.push(newConfig as TableAction);

        return;
    }

    reorderAction.config.rowsOrder = newRowsOrder;

    console.log('reorderAction: ', reorderAction);
}


export {
    editRowAction,
    deleteRowAction,
    createRowAction,
    moveRowAction,
}