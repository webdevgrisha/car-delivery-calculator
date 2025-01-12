import admin from "../../init";

async function getExchangeRate() {
  const firestoreDb = admin.firestore();
  const docRef = firestoreDb.collection("exchange").doc("ex_1");
  const doc = await docRef.get();

  if (!doc.exists) throw Error("Doc does't exist");

  const excahngeData = doc.data();

  if (!excahngeData || !excahngeData.usd_eur || !excahngeData.usd_pln) {
    throw Error("Exchange rate not set!");
  }

  return {usd_eur: +excahngeData.usd_eur, usd_pln: +excahngeData.usd_pln};
}

export default getExchangeRate;
