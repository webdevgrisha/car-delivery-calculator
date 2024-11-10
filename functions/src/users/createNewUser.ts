import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";


export const createNewUser = onCall(
  async (
    request: CallableRequest<
      { email: string, displayName: string, role: "admin" | "user" }
    >
  ) => {
    checkAdminRole(request);

    const {email, displayName, role} = request.data;

    const realtimeDb = admin.database();
    const usersRef = realtimeDb.ref("users");

    try {
      const userRecord = await admin.auth().createUser({
        email,
        displayName,
      });

      usersRef.child(userRecord.uid).set({
        displayName,
        email,
        role,
      });

      console.log("User created successfully");

      try {
        await admin.auth().setCustomUserClaims(userRecord.uid, {role: role});
      } catch (err) {
        error("Error installing administrator role", err);
        console.log("Failed to set role and user has been deleted:", err);
        // !!!нужна доп проверка в успешнрсти кода
        await admin.auth().deleteUser(userRecord.uid);
        return {error: "Failed to set role and user has been deleted"};
      }

      return {message: "User was created successfully"};
    } catch (err) {
      const e = err as FirebaseError;

      if (e.code === "auth/email-already-exists") {
        error("User with this email already exists:", e);
        return {error: "User with this email already exists"};
      }

      error("Failed to create user and set roll", err);
      return {error: "Failed to create user and set role"};
    }
  });
