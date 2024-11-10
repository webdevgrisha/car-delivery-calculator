import admin from "../../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {checkAdminRole} from "../../checkAdminRole";
import {FirebaseError} from "firebase-admin";

type Currency = "USD" | "EUR" | "PLN";

interface RowData {
  serviceName: string;
  currency: Currency;
  price: string;
  isShown: boolean;
}

interface DeleteActionConfig {
  action: "delete";
  id: string;
}

interface CreateEditActionConfig {
  action: "create" | "edit";
  id: string;
  config: RowData;
}

type ServiceAction = DeleteActionConfig | CreateEditActionConfig;

export const updateCalculatorSettingsData = onCall(
  async (
    request: CallableRequest<
      { tableAction: ServiceAction[], tableName: string }
    >
  ) => {
    checkAdminRole(request);

    const {tableAction, tableName} = request.data;

    const firestoreDb = admin.firestore();
    const tableRef = firestoreDb.collection(tableName);

    try {
      const actionsArrPromise = tableAction.map((tableAction) => {
        const {action, id} = tableAction;
        if (action === "delete") {
          return tableRef.doc(id).delete();
        }

        return tableRef.doc(id).set(tableAction.config, {merge: true});
      });

      await Promise.all(actionsArrPromise);

      console.log("Data update succesfully");

      return {message: "Data update succesfully"};
    } catch (err) {
      const e = err as FirebaseError;

      switch (e.code) {
      case "auth/user-not-found":
        error("User does not exist", e);
        return {error: "User does not exist"};
      case "permission-denied":
        error("Permission denied", e);
        return {error: "Permission denied"};
      case "unauthenticated":
        error("Unauthenticated user", e);
        return {error: "Unauthenticated user"};
      case "unavailable":
        error("Firestore is currently unavailable", e);
        return {error: "Firestore is currently unavailable"};
      case "internal":
        error("Internal server error", e);
        return {error: "Internal server error"};
      case "invalid-argument":
        error("Invalid argument provided", e);
        return {error: "Invalid argument provided"};
      default:
        error("Failed to update data", err);
        return {error: "Failed to update data"};
      }
    }
  });
