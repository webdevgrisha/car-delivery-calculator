import { httpsCallable } from "firebase/functions";
import { functions } from './firebaseConfig';

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
const getAuctionData = httpsCallable(functions, "getAuctionData");
const getCalculatorConfigurations = httpsCallable(functions, "getCalculatorConfigurations");
const createCalculatorConfiguration = httpsCallable(functions, "createCalculatorConfiguration");
const renameCalculatorConfiguration = httpsCallable(functions, "renameCalculatorConfiguration");
const deleteCalculatorConfiguration = httpsCallable(functions, "deleteCalculatorConfiguration");

import { readAllUsers } from './realtimeDb';
import { AddFunc, DeleteFunc, EditFunc } from "../../components/Users/UserTable/interfaces";

// getAuctionData({ url: 'https://www.copart.com/lot/83976684' }).then(data => console.log('getAuctionData: ', data)).catch(err => console.log('getAuctionData Err:', err));

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
    calculateRowsData,
    getAuctionData,
    getCalculatorConfigurations,
    createCalculatorConfiguration,
    renameCalculatorConfiguration,
    deleteCalculatorConfiguration
}

readAllUsers();
