import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";

interface TableRecords {
  [key: string]: string;
}

export const createTableFromJSON = onCall(
  async (
    request: CallableRequest<{ tableName: string, parseArr: string }>
  ) => {
    try {
      checkAdminRole(request);

      const {tableName, parseArr} = request.data;
      const firestore = admin.firestore();
      const tableRef = firestore.collection(tableName);
      const tableData: TableRecords[] = JSON.parse(parseArr);

      if (!tableName || !parseArr) {
        return {error: "Invalid input data"};
      }

      const snapshot = await tableRef.get();
      const deleteRecordsPromises = snapshot.docs.map(
        (doc) => doc.ref.delete()
      );
      await Promise.all(deleteRecordsPromises);

      const addRecordsPromises = tableData.map((data) =>
        tableRef.add(data)
      );

      return Promise.all(addRecordsPromises).then(() => {
        return {message: "The data was successfully loaded"};
      }).catch(() => {
        return {error: "Error while adding records to the database"};
      });
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "permission-denied") {
        return {error: "Access denied."};
      } else {
        return {error: "Database operation failed: " + error.message};
      }
    }
  }
);


