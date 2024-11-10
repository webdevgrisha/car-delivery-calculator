/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import {addAdminRole} from "./users/addAdminRole";
import {createNewUser} from "./users/createNewUser";
import {getUsers} from "./users/getUsers";
import {checkUserExists} from "./users/checkUserExists";
import {checkAdminRole} from "./checkAdminRole";
import {deleteUser} from "./users/deleteUser";
import {editUser} from "./users/editUser";
import {createTableFromJSON} from "./tables/createTableFromJSON";
import {deleteTableRecord} from "./tables/deleteTableRecord";
import {editTableRecord} from "./tables/editTableRecord";
import {createTableRecord} from "./tables/createTableRecord";
import {updateCalculatorSettingsData}
  from "./tables/sttings/updateCalculatorSettingsData";
import {getCalculatorSettingsData}
  from "./tables/sttings/getCalculatorSettingsData";
import {scheduleExchangeRateUpdate, updateExchangeRateHttp}
  from "./exchange/exchangeRateAutoUpdate";
import {calculateRowsData} from "./calculation/calculateRowsData";

export {
  addAdminRole,
  createNewUser,
  getUsers,
  checkUserExists,
  checkAdminRole,
  deleteUser,
  editUser,
  createTableFromJSON,
  deleteTableRecord,
  editTableRecord,
  createTableRecord,
  updateCalculatorSettingsData,
  getCalculatorSettingsData,
  scheduleExchangeRateUpdate,
  updateExchangeRateHttp,
  calculateRowsData,
};
