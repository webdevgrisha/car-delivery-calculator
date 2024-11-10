import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";

import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";

export const addAdminRole = onCall(
  async (request: CallableRequest<{ email: string }>) => {
    checkAdminRole(request);

    const {email} = request.data;

    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      await admin.auth().setCustomUserClaims(userRecord.uid, {role: "admin"});
      return {message: `Success! ${email} has been made an admin`};
    } catch (err) {
      const errorCode = (err as FirebaseError).code;
      if (errorCode === "auth/user-not-found") {
        error("User not found: ", err);
        return {error: "User not found. Please check the email address."};
      } else if (errorCode === "auth/invalid-argument") {
        error("Invalid email address provided: ", err);
        return {error: "Invalid email address provided."};
      } else {
        error("Error installing administrator role", err);
        return {error: "Failed to add admin role."};
      }
    }
  });
