import * as admin from "firebase-admin";
// import * as cors from "cors";

// cors({origin: true});

admin.initializeApp({databaseURL: "https://liberty-cars-calculator-default-rtdb.europe-west1.firebasedatabase.app"});

export default admin;
