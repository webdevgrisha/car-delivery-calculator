import './firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const auth = getAuth();
const functions = getFunctions();

// const addAdminRole = httpsCallable(functions, "addAdminRole");

// addAdminRole({ email: 'test1@gmail.com' }).then((result) => {
//     console.log(result);
// });

export function createUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            console.log('User create: ', userCredentail)
            const user = userCredentail.user;
            console.log('User: ', user);
        })
        .catch((err) => {
            console.log('user not create: ', err.message);
        });
}

export function signInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            console.log('User login: ', userCredentail)
            const user = userCredentail.user;
            console.log('User: ', user);
        })
        .catch((err) => {
            console.log('user not login: ', err.message);
        });
}

export function subscribeOnAuthStateChanged(stateChangedFunc: Function) {
    return onAuthStateChanged(auth, stateChangedFunc);
}

export function userSignOut() {
    signOut(auth)
        .then(() => console.log('user sign out '))
        .catch((err) => console.log('Error when user sign out: ', err.message));
}


export async function checkAdminRole() {
    const user = auth.currentUser;

    if (!user) return false;

    const idTokenResult = await user.getIdTokenResult();

    if (idTokenResult.claims.admin) {
        console.log("User is an admin");
    } else {
        console.log("User is not an admin");
    }

    return idTokenResult.claims.admin;
}

// createUser('test1@gmail.com', '12345678');