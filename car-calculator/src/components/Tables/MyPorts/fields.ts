import { FieldInfo } from "../../CustomTable/types";
import { portValidation } from "../validateFunctions";

const shippingPortsFields: FieldInfo[] = [
    {
        tagName: 'input',
        fieldConfig: {
            name: 'To Port',
            placeholder: 'To port',
            type: 'text',
            validate: portValidation,
        },
    },
];

const destinationPortsFields: FieldInfo[] = [
    {
        tagName: 'input',
        fieldConfig: {
            name: 'Destination',
            placeholder: 'Destination port',
            type: 'text',
            validate: portValidation,
        },
    },
];

export {
    shippingPortsFields,
    destinationPortsFields
}