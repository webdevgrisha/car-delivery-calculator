import admin from "../init";
import {CallableRequest, onCall} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";
import {UserRecord} from "firebase-admin/auth";

export const getUsers = onCall(async (request: CallableRequest) => {
  checkAdminRole(request);

  console.log("Function run");
  try {
    console.log("Start loading users");
    const result = await admin.auth().listUsers(100);

    console.log("Result: ", result);
    result.users.forEach(
      (userRecord: UserRecord) => console.log("User: ", userRecord)
    );

    return {users: result.users};
  } catch (err) {
    const e = err as FirebaseError;
    if (e.code === "auth/internal-error") {
      error("Firebase server problem", e);
      return {error: "Firebase server problem"};
    } else if (e.code === "auth/insufficient-permission") {
      error("Permissions problem:", e);
      return {error: "You do not have access rights for this operation."};
    }

    error("unknown error:", e);
    return {error: "Unknown error. Try again later"};
  }
});
