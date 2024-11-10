import admin from "../../init";

interface TablesSearch {
    [key: string]: (tableParams: string[]) => Promise<string | typeof NaN>,
}

const firestoreDb = admin.firestore();

const tablesSearch: TablesSearch = {
  shipping_cost_to_a_US_port: async (tableParams: string[]) => {
    const [auction, location, colName] = tableParams;

    const querySnapshot = await firestoreDb
      .collection("shipping_cost_to_a_US_port")
      .where("Auction", "==", auction)
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
    const [auction, location, colName] = tableParams;

    const querySnapshot = await firestoreDb
      .collection("shipping_cost_to_a_US_port")
      .where("Auction", "==", auction)
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
      // .where(colName, "!=", "")
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NaN;
    }

    const result: string = querySnapshot.docs[0].data()[colName];

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
