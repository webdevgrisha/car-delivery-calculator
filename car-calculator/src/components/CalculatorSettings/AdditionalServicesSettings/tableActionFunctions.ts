import { CreateEditActionConfig, DeleteActionConfig, RowData, ServiceAction } from "./interfaces";

function editServiceAction<K extends keyof RowData>(
    servicesAction: ServiceAction,
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

function deleteServiceAction(servicesAction: ServiceAction, id: string) {
    if (servicesAction[id]?.action === 'delete') return;

    servicesAction[id] = {
        action: 'delete',
        id: id,
    } as DeleteActionConfig;
}

function createServiceAction(
    servicesAction: ServiceAction,
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


export {
    editServiceAction,
    deleteServiceAction,
    createServiceAction
}