import admin from "../../init";

const firestoreDb = admin.firestore();

async function calcConstFee(auction: string) {
  let totalSum = 0;

  const docRef = firestoreDb.collection(
    `${auction.toLocaleLowerCase()}_auction_const_fee`
  ).doc("consts");
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    const docData = docSnap.data() as Record<string, string>;

    const sum = Object.values(docData)
      .reduce((sum: number, cur: string) => sum += +cur, 0);

    totalSum += sum;
  } else {
    return NaN;
  }

  return totalSum;
}

async function calcClientFee(auction: string, carPrice: string) {
  const querySnapshot = await firestoreDb.collection(
    `${auction.toLocaleLowerCase()}_auction_client_fee`
  ).get();


  if (querySnapshot.empty) {
    return NaN;
  }

  const rowData = querySnapshot.docs.find((row) => {
    const [a, b] = row.data()["Cena sprzedaży"].split("-");

    const [numA, numB] = [parseFloat(a), parseFloat(b)];

    if (isNaN(numB)) {
      const result = +carPrice >= numA;

      return result;
    }

    return +carPrice >= numA && +carPrice <= numB;
  });

  if (rowData === undefined) return NaN;

  const sum = Object.entries(rowData.data())
    .reduce((sum: number, [rowName, value]) => {
      if (rowName === "Cena sprzedaży") return sum;

      if (value.endsWith("%")) {
        const parsePreset = parseFloat(value);
        return sum + (+carPrice * parsePreset) / 100;
      }
      return sum + parseFloat(value);
    }, 0);

  return sum;
}

async function calcAuctionFees(auction: string, carPrice: string) {
  try {
    const result = await Promise.all([
      calcConstFee(auction),
      calcClientFee(auction, carPrice),
    ]);

    return result[0] + result[1];
  } catch (error) {
    console.error("Ошибка в calcAuctionFees:", error);
    return NaN;
  }
}

export default calcAuctionFees;
