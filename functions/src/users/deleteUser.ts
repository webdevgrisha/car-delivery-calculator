import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {FirebaseError} from "firebase-admin";
import {checkAdminRole} from "../checkAdminRole";


export const deleteUser = onCall(
  async (request: CallableRequest<{ uid: string }>) => {
    checkAdminRole(request);

    const {uid} = request.data;
    const realtimeDb = admin.database();
    const userRef = realtimeDb.ref(`users/${uid}`);


    try {
      await userRef.remove();
      await admin.auth().deleteUser(uid);

      console.log("User delete");
      return {message: "user was successfully deleted"};
    } catch (err) {
      const e = err as FirebaseError;
      if (e.code === "auth/user-not-found") {
        error("User does not exist:", e);
        return {error: "User does not exist"};
      } else {
        error("User was not deleted:", e);
        return {error: `User was not deleted: ${e.message}`};
      }
    }
  }
);
