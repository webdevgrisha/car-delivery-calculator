import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";

interface TableData {
    [key: string]: string;
}

export const createTableRecord = onCall(
  async (
    request: CallableRequest<
      { tableName: string, recordData: TableData }
    >
  ) => {
    checkAdminRole(request);

    const {tableName, recordData} = request.data;
    const firestoreDb = admin.firestore();
    const tableRef = firestoreDb.collection(tableName);

    try {
      await tableRef.add(recordData);

      console.log("Record created successfully");

      return {message: "Record was created successfully"};
    } catch (err) {
      const e = err as FirebaseError;

      error("Failed to create new table record", e);

      return {error: "Failed to create new table record"};
    }
  });
