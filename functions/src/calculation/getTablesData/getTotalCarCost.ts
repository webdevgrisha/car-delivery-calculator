import admin from "../../init";
import {TotalCost} from "../interfaces";
import {configurationCollectionPath}
  from "../../calculatorConfigurations/configurationPath";

async function getTotalCarCost(configurationId?: string): Promise<TotalCost> {
  const firestoreDb = admin.firestore();
  const docRef = firestoreDb
    .collection(configurationCollectionPath(configurationId, "total_car_cost"))
    .doc("total_cost");
  const doc = await docRef.get();

  if (!doc.exists) throw Error("Doc does't exist");

  const totalCost = doc.data() as TotalCost;

  if (!totalCost || !totalCost.currency) {
    throw Error("TotalCost not set!");
  }

  return totalCost;
}

export default getTotalCarCost;
