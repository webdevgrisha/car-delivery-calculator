import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";

interface TableUpdateData {
    [key: string]: string;
}

export const editTableRecord = onCall(
  async (
    request: CallableRequest<
      { id: string, tableName: string, editRecordData: TableUpdateData }
    >
  ) => {
    checkAdminRole(request);

    const {id, tableName, editRecordData} = request.data;

    const firestoreDb = admin.firestore();
    const tableRecordRef = firestoreDb.collection(tableName).doc(id);

    try {
      await tableRecordRef.update({...editRecordData});
      console.log("Data update succesfully");

      return {message: "Data update succesfully"};
    } catch (err) {
      const e = err as FirebaseError;

      if (e.code === "auth/user-not-found") {
        error("Record does not exist", e);
        return {error: "Record does not exist"};
      }

      error("Failed to update data", err);
      return {error: "Failed to update data"};
    }
  });
