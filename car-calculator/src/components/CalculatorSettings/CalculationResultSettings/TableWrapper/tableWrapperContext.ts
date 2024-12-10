import { createContext, useContext } from "react";
import { TableContext } from "./interfaces";

export const TableWrapperContext = createContext<TableContext | undefined>(undefined);

export function useTableWrapperContext() {
    const contextData = useContext(TableWrapperContext);

    if(contextData === undefined) {
        throw new Error('useCustomTableContext must be used with a CustomTableContext');
    }

    return contextData;
}