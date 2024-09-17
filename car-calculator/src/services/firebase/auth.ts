import './firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const auth = getAuth();
const functions = getFunctions();

// const addAdminRole = httpsCallable(functions, "addAdminRole");

// addAdminRole({ email: 'test1@gmail.com' }).then((result) => {
//     console.log(result);
// });

function createUser(email: string, password: string) {
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

function signInUser(email: string, password: string) {
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

function userSignOut() {
    signOut(auth)
        .then(() => console.log('user sign out '))
        .catch((err) => console.log('Error when user sign out: ', err.message));
}

// subscriptions
function subscribeOnAuthStateChanged(stateChangedFunc: Function) {
    return onAuthStateChanged(auth, stateChangedFunc);
}


async function checkAdminRole() {
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


// update User obj
async function updateUserName(name: string) {
    const user = auth.currentUser;

    if (!user) return { error: 'you cannot change the name until you are logged in. ' }

    updateProfile(user, {
        displayName: name,
    }).then(() => console.log('name was update'));
}


// createUser('test1@gmail.com', '12345678');

export {
    createUser,
    signInUser,
    userSignOut,
    subscribeOnAuthStateChanged,
    checkAdminRole,
    updateUserName,
}