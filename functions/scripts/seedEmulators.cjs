const admin = require('firebase-admin');

const projectId = 'liberty-cars-calculator';

process.env.FIREBASE_AUTH_EMULATOR_HOST ||= '127.0.0.1:9199';
process.env.FIRESTORE_EMULATOR_HOST ||= '127.0.0.1:8180';
process.env.FIREBASE_DATABASE_EMULATOR_HOST ||= '127.0.0.1:9100';

admin.initializeApp({
  projectId,
  databaseURL: `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/?ns=${projectId}`,
});

const firestore = admin.firestore();

const collections = {
  'shipping_ports_(from)': {
    new_york: {'To Port': 'New York, NY'},
    houston: {'To Port': 'Houston, TX'},
    los_angeles: {'To Port': 'Los Angeles, CA'},
  },
  'destination_ports_(to)': {
    gdynia: {Destination: 'Gdynia'},
    rotterdam: {Destination: 'Rotterdam'},
    bremerhaven: {Destination: 'Bremerhaven'},
  },
  shipping_cost_to_a_US_port: {
    chicago: {Location: 'Chicago, IL - Copart', 'To Port': 'New York, NY', Sedan: '650', Suv: '725', 'Duży Suv': '825', Pickup: '850', Van: '900', Motor: '450'},
    dallas: {Location: 'Dallas, TX - Copart', 'To Port': 'Houston, TX', Sedan: '475', Suv: '550', 'Duży Suv': '650', Pickup: '675', Van: '725', Motor: '350'},
    newark: {Location: 'Newark, NJ - IAAI', 'To Port': 'New York, NY', Sedan: '250', Suv: '300', 'Duży Suv': '375', Pickup: '400', Van: '450', Motor: '200'},
    anaheim: {Location: 'Anaheim, CA - IAAI', 'To Port': 'Los Angeles, CA', Sedan: '300', Suv: '350', 'Duży Suv': '425', Pickup: '450', Van: '500', Motor: '225'},
  },
  delivery_by_ship: {
    ny_gdynia: {From: 'New York, NY', Destination: 'Gdynia', Sedan: '1150', Suv: '1300', 'Duży Suv': '1450', Pickup: '1500', Van: '1600', Motor: '750'},
    houston_gdynia: {From: 'Houston, TX', Destination: 'Gdynia', Sedan: '1250', Suv: '1400', 'Duży Suv': '1550', Pickup: '1600', Van: '1700', Motor: '800'},
    la_gdynia: {From: 'Los Angeles, CA', Destination: 'Gdynia', Sedan: '1450', Suv: '1600', 'Duży Suv': '1750', Pickup: '1800', Van: '1900', Motor: '900'},
  },
  copart_auction_const_fee: {
    consts: {'Environmental Fee': '15', 'Gate Fee': '79'},
  },
  copart_auction_client_fee: {
    low: {'Cena sprzedaży': '0-999.99', 'Wysokość prowizji': '125', LiveBid: '39'},
    medium: {'Cena sprzedaży': '1000-4999.99', 'Wysokość prowizji': '12%', LiveBid: '59'},
    high: {'Cena sprzedaży': '5000-', 'Wysokość prowizji': '9%', LiveBid: '79'},
  },
  iaai_auction_const_fee: {
    consts: {'Service Fee': '95', 'Environmental Fee': '15', 'Broker Fee': '50'},
  },
  iaai_auction_client_fee: {
    low: {'Cena sprzedaży': '0-999.99', 'Wysokość prowizji (Buyer)': '140', 'Wysokość prowizji (Internal)': '35'},
    medium: {'Cena sprzedaży': '1000-4999.99', 'Wysokość prowizji (Buyer)': '11%', 'Wysokość prowizji (Internal)': '50'},
    high: {'Cena sprzedaży': '5000-', 'Wysokość prowizji (Buyer)': '8%', 'Wysokość prowizji (Internal)': '75'},
  },
  excise_taxes: {
    less_2l: {'Pojemność silnika': 'Less 2L', 'Stawka akcyzy': '0.031'},
    more_2l: {'Pojemność silnika': 'More 2L', 'Stawka akcyzy': '0.186'},
  },
  clo_taxes: {
    car: {'Transport type': 'car', Clo: '0.1'},
    motor: {'Transport type': 'motor', Clo: '0.06'},
  },
  exchange: {
    ex_1: {usd_pln: '4.05', usd_eur: '0.93'},
  },
  auction_and_shipping: {
    car_price: {rowType: 'info', rowName: 'Cena pojazdu', formula: '@[#carPrice]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    auction_fee: {rowType: 'info', rowName: 'Opłaty aukcyjne', formula: '@[$calc_auction_fee(#auction,#carPrice)]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    land_transport: {rowType: 'info', rowName: 'Transport w USA', formula: '@[$shipping_cost_to_a_US_port(#location,#carSize)]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    sea_transport: {rowType: 'info', rowName: 'Transport morski', formula: '@[$delivery_by_ship($get_port_name(#location,#carSize),Gdynia,#carSize)]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    insurance_us: {rowType: 'info', rowName: 'Insurance', formula: 'max(50,(@[#carPrice]+@[$calc_auction_fee(#auction,#carPrice)])*0.03)', currency: 'USD', baseCurrency: 'USD', isShown: true, isOptional: true},
    offsite: {rowType: 'info', rowName: 'Offsite', formula: '50', currency: 'USD', baseCurrency: 'USD', isShown: true, isOptional: true},
    electrician: {rowType: 'info', rowName: 'Elektryk', formula: '50', currency: 'USD', baseCurrency: 'USD', isShown: true, isOptional: true},
    abstract: {rowType: 'info', rowName: 'Abstract', formula: '80', currency: 'USD', baseCurrency: 'USD', isShown: true, isOptional: true},
    new_title: {rowType: 'info', rowName: 'New Title', formula: '450', currency: 'USD', baseCurrency: 'USD', isShown: true, isOptional: true},
    order: {rowType: 'order', rowsOrder: ['car_price', 'auction_fee', 'land_transport', 'sea_transport', 'insurance_us', 'offsite', 'electrician', 'abstract', 'new_title']},
    result: {rowType: 'result', rowName: 'Aukcja i wysyłka razem', currency: 'USD'},
  },
  customs_clearance: {
    customs_costs: {rowType: 'info', rowName: 'Koszt odprawy', formula: '@[#customsCosts]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    duty: {rowType: 'info', rowName: 'Cło', formula: '@[#carPrice]*@[$clo_taxes(#carSize)]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    excise: {rowType: 'info', rowName: 'Akcyza', formula: '@[#carPrice]*@[$excise_taxes(#engineSize)]', currency: 'USD', baseCurrency: 'USD', isShown: true},
    order: {rowType: 'order', rowsOrder: ['customs_costs', 'duty', 'excise']},
    result: {rowType: 'result', rowName: 'Odprawa celna razem', currency: 'USD'},
  },
  other_payments: {
    repair: {rowType: 'info', rowName: 'Naprawa', formula: '@[#repairCosts]', currency: 'PLN', baseCurrency: 'PLN', isShown: true},
    insurance: {rowType: 'info', rowName: 'Ubezpieczenie', formula: '500', currency: 'PLN', baseCurrency: 'PLN', isShown: true},
    detailing: {rowType: 'info', rowName: 'Detailing', formula: '800', currency: 'PLN', baseCurrency: 'PLN', isShown: true},
    order: {rowType: 'order', rowsOrder: ['repair', 'insurance', 'detailing']},
    result: {rowType: 'result', rowName: 'Inne płatności razem', currency: 'PLN'},
  },
  total_car_cost: {
    total_cost: {currency: 'PLN'},
  },
};

async function seedFirestore() {
  for (const [collectionName, documents] of Object.entries(collections)) {
    for (const [documentId, data] of Object.entries(documents)) {
      await firestore.collection(collectionName).doc(documentId).set(data);
    }
  }
}

async function upsertUser({email, password, displayName, role}) {
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
    user = await admin.auth().updateUser(user.uid, {password, displayName});
  } catch (error) {
    if (error.code !== 'auth/user-not-found') throw error;
    user = await admin.auth().createUser({email, password, displayName});
  }

  await admin.auth().setCustomUserClaims(user.uid, {role});
  await admin.database().ref(`users/${user.uid}`).set({email, displayName, role});
}

async function main() {
  await seedFirestore();
  await upsertUser({email: 'admin@local.test', password: 'admin123', displayName: 'Local Admin', role: 'admin'});
  await upsertUser({email: 'user@local.test', password: 'user123', displayName: 'Local User', role: 'user'});
  console.log('Emulators seeded successfully.');
  console.log('Admin: admin@local.test / admin123');
  console.log('User:  user@local.test / user123');
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
