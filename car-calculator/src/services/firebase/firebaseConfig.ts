// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
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
// const db = getFirestore()

export const realtimeDb = getDatabase(app);
export const firestoreDb = getFirestore(app);