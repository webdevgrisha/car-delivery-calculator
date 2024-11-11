import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions();

const addAdminRole = httpsCallable(functions, "addAdminRole");
const createNewUser = httpsCallable(functions, "createNewUser") as AddFunc;
const getUsers = httpsCallable(functions, "getUsers");
const deleteUser = httpsCallable(functions, "deleteUser") as DeleteFunc;
const editUser = httpsCallable(functions, "editUser") as EditFunc;
const createTableFromJSON = httpsCallable(functions, "createTableFromJSON");
const deleteTableRecord = httpsCallable(functions, "deleteTableRecord");
const editTableRecord = httpsCallable(functions, "editTableRecord");
const createTableRecord = httpsCallable(functions, "createTableRecord");
const updateCalculatorSettingsData = httpsCallable(functions, "updateCalculatorSettingsData");
const getCalculatorSettingsData = httpsCallable(functions, "getCalculatorSettingsData");
const calculateRowsData = httpsCallable(functions, "calculateRowsData");

import { readAllUsers } from './realtimeDb';
import { AddFunc, DeleteFunc, EditFunc } from "../../components/Users/UserTable/interfaces";

export {
    addAdminRole,
    getUsers,
    createNewUser,
    deleteUser,
    editUser,
    createTableFromJSON,
    deleteTableRecord,
    editTableRecord,
    createTableRecord,
    updateCalculatorSettingsData,
    getCalculatorSettingsData,
    calculateRowsData
}

readAllUsers();
// console.log(editUser);
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