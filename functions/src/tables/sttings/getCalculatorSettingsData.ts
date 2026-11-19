import admin from "../../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {FirebaseError} from "firebase-admin";
import {configurationCollectionPath, isConfigurationTable}
  from "../../calculatorConfigurations/configurationPath";

type Currency = "PLN" | "USD" | "EUR";

interface ResultRowData {
  id?: string;
  rowType: "info" | "result";
  rowName: string;
  currency: Currency;
  isOptional?: boolean;
}

interface InfoData {
  rowType: "info";
  rowName: string;
  formula: string;
  currency: Currency;
  isShown: boolean;
  isOptional?: boolean;
}

interface ResultData {
  rowType: "result";
  rowName: string;
  currency: Currency;
}

interface InfoRows {
  [key: string]: InfoData;
}

interface InitRowsConfig {
  info: InfoRows;
  order: string[];
  result: ResultData;
}

export const getCalculatorSettingsData = onCall(
  async (
    request: CallableRequest<
      { tableName: string, configurationId?: string }
    >
  ) => {
    const userAuth = request.auth;

    if (!userAuth) {
      return {error: "User is not authenticated"};
    }

    const {tableName, configurationId} = request.data;

    if (!isConfigurationTable(tableName)) {
      return {error: "Invalid calculator settings table"};
    }

    const firestoreDb = admin.firestore();
    const tableRef = firestoreDb.collection(
      configurationCollectionPath(configurationId, tableName)
    );

    try {
      const querySnapshot = await tableRef.get();

      const initRowsConfig: InitRowsConfig = {
        info: {},
        result: {
          rowType: "result",
          rowName: "",
          currency: "PLN",
        },
        order: [],
      };

      querySnapshot.docs.forEach((doc) => {
        const docData = doc.data();

        const rowType: "info" | "order" | "result" = docData.rowType;

        switch (rowType) {
        case "info":
          {
            const infoData = docData as InfoData;
            if (infoData.isShown && infoData.rowName.trim() !== "") {
              initRowsConfig.info[doc.id] = infoData;
            }
          }
          break;
        case "result":
          initRowsConfig.result = docData as ResultData;
          break;
        case "order":
          initRowsConfig.order = docData.rowsOrder;
        }
      });

      const resultRows: ResultRowData[] = [];

      initRowsConfig.order.forEach((id: string) => {
        const rowData = initRowsConfig.info[id];

        if (!rowData) return;

        resultRows.push({
          id,
          rowType: rowData.rowType,
          rowName: rowData.rowName,
          currency: rowData.currency,
          isOptional: rowData.isOptional ?? false,
        });
      });

      resultRows.push(initRowsConfig.result);

      return {tableRows: resultRows};
    } catch (err) {
      const e = err as FirebaseError;

      error("Error updating calculator settings data", err);
      return {error: e.message || "An unknown error occurred"};
    }
  }
);
