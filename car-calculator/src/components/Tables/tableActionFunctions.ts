import { createTableFromJSON, createTableRecord, deleteTableRecord, editTableRecord } from "../../services/firebase/functions";
import { CreateTableRecord, DeleteTableRowData, EditTableData } from "./interfaces";

function createActionFunctions(tableName: string) {
    const tableActionFunction = {
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
        createTableFormJSON: (file: string) => {
            return createTableFromJSON({
                tableName: tableName,
                parseArr: file,
            });
        }
    };

    return tableActionFunction;
}

export default createActionFunctions;