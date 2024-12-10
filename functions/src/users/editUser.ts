import admin from "../init";
import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {checkAdminRole} from "../checkAdminRole";
import {FirebaseError} from "firebase-admin";
import {UserRecord} from "firebase-admin/auth";

interface UserUpdateData {
  name?: string;
  email?: string;
  role?: "admin" | "user";
}


export const editUser = onCall(
  async (
    request: CallableRequest<
      { uid: string, editUserData: UserUpdateData }
    >
  ) => {
    checkAdminRole(request);

    const {uid, editUserData} = request.data;

    const realtimeDb = admin.database();
    const usersRef = realtimeDb.ref(`users/${uid}`);

    try {
      const userRecord: UserRecord = await admin.auth().getUser(uid);

      if (userRecord?.customClaims?.role !== editUserData?.role) {
        await admin.auth().setCustomUserClaims(
          userRecord.uid, {role: editUserData.role}
        );
      }

      await usersRef.update({...editUserData});

      console.log("Data update succesfully");

      return {message: "User data update succesfully"};
    } catch (err) {
      const e = err as FirebaseError;

      if (e.code === "auth/user-not-found") {
        error("User does not exist", e);
        return {error: "User does not exist"};
      }

      error("Failed to update user data", err);
      return {error: "Failed to update user data"};
    }
  });
