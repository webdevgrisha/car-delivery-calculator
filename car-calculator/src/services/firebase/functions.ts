import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions();

const addAdminRole = httpsCallable(functions, "addAdminRole");
const createNewUser = httpsCallable(functions, "createNewUser");
const getUsers = httpsCallable(functions, "getUsers");
const deleteUser = httpsCallable(functions, "deleteUser");

import { writeUserData, readAllUsers } from './realtimeDb';

export {
    addAdminRole,
    createNewUser,
    getUsers,
    deleteUser,
}

// readAllUsers();
// (async () => {
//     const result = await getUsers();

//     const users = result.data.users;
//     console.log('function users: ', users);

//     users.forEach((user) => {
//         const { uid, displayName, email, customClaims } = user;
//         console.log('user: ', user);
//         writeUserData(uid, displayName, email, customClaims.role);
//     });
// })()