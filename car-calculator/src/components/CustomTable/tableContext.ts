import { createContext, useContext } from "react";
import { TableContext } from "./interfaces";

export const CustomTableContext = createContext<TableContext | undefined>(undefined);

export function useCustomTableContext() {
    const contextData = useContext(CustomTableContext);

    if(contextData === undefined) {
        throw new Error('useCustomTableContext must be used with a CustomTableContext');
    }

    return contextData;
}