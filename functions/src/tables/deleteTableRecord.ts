import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";
import {error} from "firebase-functions/logger";

export const deleteTableRecord = onCall(
  async (request: CallableRequest<{ tableName: string, id: string }>) => {
    checkAdminRole(request);

    const {tableName, id} = request.data;
    const firestoreDb = admin.firestore();
    const tableRecordRef = firestoreDb.collection(tableName).doc(id);

    try {
      await tableRecordRef.delete();

      console.log("Record was delete successfully");
      return {message: "Record was successfully deleted"};
    } catch (err) {
      const e = err as FirebaseError;
      if (e.code === "auth/user-not-found") {
        error("Record does not exist:", e);
        return {error: "Record does not exist"};
      } else {
        error("Record was not deleted:", e);
        return {error: `Record was not deleted: ${e.message}`};
      }
    }
  }
);
