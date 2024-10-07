import { useState } from "react";
import { createTableFromJSON, createTableRecord, deleteTableRecord, editTableRecord } from "../../services/firebase/functions";
import { CreateTableRecord, DeleteTableRowData, EditTableData } from "./interfaces";

function useCreateActionFunctions(tableName: string) {
    const [tableActionFunction] = useState(() => ({
        addNewRecordFunc: (data: CreateTableRecord) => {
            return createTableRecord({
                tableName: tableName,
                recordData: data,
            });
        },
        deleteRecordFunc: (obj: DeleteTableRowData) => {
            return deleteTableRecord({
                tableName: tableName,
                id: obj.id,
            });
        },
        editRecordFunc: (data: EditTableData) => {
            return editTableRecord({
                tableName: tableName,
                ...data,
            });
        },
        createTableFormCSV: (file: string) => {
            return createTableFromJSON({
                tableName: tableName,
                parseArr: file,
            });
        }
    }));

    return tableActionFunction;
}

export default useCreateActionFunctions;