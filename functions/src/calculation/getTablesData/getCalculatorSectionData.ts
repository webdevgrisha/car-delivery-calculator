import admin from "../../init";
import {SectionRow} from "../interfaces";

type Currency = "PLN" | "USD" | "EUR";

type RowType = "info" | "order" | "result";

interface InfoData {
  rowType: "info";
  rowName: string;
  formula: string;
  currency: Currency;
  baseCurrency: Currency;
  isShown: boolean;
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

async function getCalculatorSectionData(tableName: string) {
  const firestoreDb = admin.firestore();
  const tableRef = firestoreDb.collection(tableName);

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

    const rowType: RowType = docData.rowType;

    switch (rowType) {
    case "info":
      {
        const infoData = docData as InfoData;
        if (infoData.rowName.trim() !== "") {
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

  const resultRows: SectionRow[] = [];

  initRowsConfig.order.forEach((id: string) => {
    const rowData = initRowsConfig.info[id];

    if (!rowData) return;

    const {formula, currency, baseCurrency, isShown} = rowData;

    resultRows.push({
      formula, currency, isShown, baseCurrency: baseCurrency || currency,
    });
  });

  const resultRow = initRowsConfig.result;

  resultRows.push({currency: resultRow.currency});

  return resultRows;
}

export default getCalculatorSectionData;
