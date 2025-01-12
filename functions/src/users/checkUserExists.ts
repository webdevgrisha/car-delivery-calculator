import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {FirebaseError} from "firebase-admin";
import {checkAdminRole} from "../checkAdminRole";


export const checkUserExists = onCall(
  async (request: CallableRequest<{ email: string }>) => {
    checkAdminRole(request);

    try {
      const {email} = request.data;
      await admin.auth().getUserByEmail(email);
      console.log("user Exists");
      return true;
    } catch (err) {
      const e = err as FirebaseError;
      if (e.code === "auth/user-not-found") {
        console.log("User does not exist");
        return false;
      } else {
        error("Error fetching user:", e);
        console.error("Error fetching user:", e);
        return {error: "Unknown error occurred"};
      }
    }
  }
);
