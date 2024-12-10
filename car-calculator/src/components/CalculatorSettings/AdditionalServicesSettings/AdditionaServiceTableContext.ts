import { createContext, useContext } from "react";
import { TableContext } from "./interfaces";

export const AdditionaServiceTableContext = createContext<TableContext | undefined>(undefined);

export function useAdditionaServiceTableContext() {
    const contextData = useContext(AdditionaServiceTableContext);

    if(contextData === undefined) {
        throw new Error('useCustomTableContext must be used with a CustomTableContext');
    }

    return contextData;
}