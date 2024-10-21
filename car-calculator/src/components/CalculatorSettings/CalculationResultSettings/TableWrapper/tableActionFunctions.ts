import { CreateEditActionConfig, DeleteActionConfig, OrderActionConfig, RowData } from "./interfaces";
import { TableAction } from "./types";

function editRowAction<K extends keyof RowData>(
    servicesAction: TableAction,
    id: string,
    name: K,
    value: RowData[K],
) {
    if (!(id in servicesAction)) {
        const config = {
            action: 'edit',
            id: id,
            config: {
                [name]: value,
            } as unknown as RowData,
        };

        servicesAction[id] = config as CreateEditActionConfig;

        return;
    }

    if (servicesAction[id].action === 'delete') return;

    servicesAction[id].action = 'edit';
    servicesAction[id].config = {
        ...servicesAction[id].config,
        [name]: value
    };

}

function deleteRowAction(servicesAction: TableAction, id: string) {

    if (servicesAction[id]?.action === 'delete') return;

    servicesAction[id] = {
        action: 'delete',
        id: id,
    } as DeleteActionConfig;
}

function createRowAction(
    servicesAction: TableAction,
    id: string,
    config: RowData,
) {
    if (id in servicesAction) return;

    const newConfig: CreateEditActionConfig = {
        action: 'create',
        id: id,
        config,
    };

    servicesAction[id] = newConfig;
}

function moveRowAction(
    servicesAction: TableAction,
    id: string,
    newRowsOrder: string[],
) {
    if (id in servicesAction) return;

    const newConfig: OrderActionConfig = {
        action: 'order',
        id: id,
        config: {
            rowsOrder: newRowsOrder,
        }
    };

    servicesAction[id] = newConfig;
}


export {
    editRowAction,
    deleteRowAction,
    createRowAction,
    moveRowAction,
}