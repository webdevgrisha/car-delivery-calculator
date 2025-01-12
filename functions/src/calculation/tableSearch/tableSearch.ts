import admin from "../../init";
import calcAuctionFees from "./calcAuctionFees";

interface TablesSearch {
  [key: string]: (tableParams: string[]) => Promise<string | typeof NaN>,
}

const firestoreDb = admin.firestore();

const tablesSearch: TablesSearch = {
  shipping_cost_to_a_US_port: async (tableParams: string[]) => {
    const [location, colName] = tableParams;

    const querySnapshot = await firestoreDb
      .collection("shipping_cost_to_a_US_port")
      .where("Location", "==", location)
      .where(colName, "!=", "")
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NaN;
    }

    const result: number = +querySnapshot.docs[0].data()[colName];

    return result;
  },
  get_port_name: async (tableParams: string[]) => {
    const [location, colName] = tableParams;

    const querySnapshot = await firestoreDb
      .collection("shipping_cost_to_a_US_port")
      .where("Location", "==", location)
      .where(colName, "!=", "")
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NaN;
    }

    const result: string = querySnapshot.docs[0].data()["To Port"];

    return result;
  },
  delivery_by_ship: async (tableParams: string[]) => {
    const [from, destination, colName] = tableParams;

    const querySnapshot = await firestoreDb
      .collection("delivery_by_ship")
      .where("From", "==", from)
      .where("Destination", "==", destination)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NaN;
    }

    const result: string = querySnapshot.docs[0].data()[colName];

    return result;
  },
  calc_auction_fee: async (tableParams: string[]) => {
    const [auction, carPrice] = tableParams;

    const totalSum = await calcAuctionFees(auction, carPrice);

    return totalSum;
  },
  excise_taxes: async (tableParams: string[]) => {
    const [engineSize] = tableParams;

    const querySnapshot = await firestoreDb
      .collection("excise_taxes")
      .where("Pojemność silnika", "==", engineSize)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NaN;
    }

    const result: string = querySnapshot.docs[0].data()["Stawka akcyzy"];

    return result;
  },
  clo_taxes: async (tableParams: string[]) => {
    const [carSize] = tableParams;

    const vichicleType = carSize === "Motor" ? "motor" : "car";

    const querySnapshot = await firestoreDb
      .collection("clo_taxes")
      .where("Transport type", "==", vichicleType)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NaN;
    }

    const result: string = querySnapshot.docs[0].data()["Clo"];

    return result;
  },

};

async function tableSearch(tableName: string, tableParams: string[]) {
  const result = tableName in tablesSearch ?
    await tablesSearch[tableName as keyof TablesSearch](tableParams) :
    NaN;

  return result;
}

export default tableSearch;
