// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBy25_bF89S1Jpv9SzBIe2FScbvsOLeW4",
    authDomain: "liberty-cars-calculator.firebaseapp.com",
    databaseURL: "https://liberty-cars-calculator-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "liberty-cars-calculator",
    storageBucket: "liberty-cars-calculator.appspot.com",
    messagingSenderId: "251134603162",
    appId: "1:251134603162:web:0882fa64aea3fd85151423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);
export const firestoreDb = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

if (import.meta.env.DEV) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9199', {
        disableWarnings: true,
    });
    connectFirestoreEmulator(firestoreDb, '127.0.0.1', 8180);
    connectDatabaseEmulator(realtimeDb, '127.0.0.1', 9100);
    connectFunctionsEmulator(functions, '127.0.0.1', 5101);
} else {
  const analytics = getAnalytics(app);
  logEvent(analytics, 'notification_received');

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6Lc1pJwqAAAAADQd9lB_SwfHgIiJiuPdrMDja5yn"),
    isTokenAutoRefreshEnabled: true,
  });
}
