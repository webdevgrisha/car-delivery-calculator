import { CreateEditActionConfig, DeleteActionConfig, RowData } from "./interfaces";
import { ServiceAction } from "./types";

function findeServiceAction(servicesAction: ServiceAction[], id: string) {
    const serviceAction: ServiceAction | undefined = servicesAction.find(
        (service) => {
            return (
                service.action !== 'delete' &&
                (service as CreateEditActionConfig).id === id
            );
        },
    );

    return serviceAction;
}

function editServiceAction<K extends keyof RowData>(
    servicesAction: ServiceAction[],
    id: string,
    name: K,
    value: RowData[K],
) {
    const serviceAction = findeServiceAction(servicesAction, id) as
        | CreateEditActionConfig
        | undefined;

    if (!serviceAction) {
        const config = {
            action: 'edit',
            id: id,
            config: {
                [name]: value,
            } as unknown as RowData,
        };

        servicesAction.push(config as ServiceAction);
    } else {
        serviceAction.action = 'edit';
        serviceAction.config = {
            ...serviceAction.config,
            [name]: value
        };
    }
}

function deleteServiceAction(servicesAction: ServiceAction[], id: string) {
    const serviceAction: ServiceAction | undefined = findeServiceAction(
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

function createServiceAction(
    servicesAction: ServiceAction[],
    id: string,
    config: RowData,
) {
    const newConfig = {
        action: 'create',
        id: id,
        config,
    };

    servicesAction.push(newConfig as ServiceAction);
}


export {
    editServiceAction,
    deleteServiceAction,
    createServiceAction
}