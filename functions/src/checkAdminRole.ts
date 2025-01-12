import {HttpsError} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import {CallableContext} from "firebase-functions/v1/https";


/**
 * Проверяет, имеет ли пользователь роль администратора.
 * @param {CallableContext} context
 * @throws {HttpsError}
 * @return {boolean}
 */
export function checkAdminRole(context: CallableContext) {
  if (!context.auth || context.auth.token.role !== "admin") {
    error("user is not a admin");
    throw new HttpsError("permission-denied",
      "Only admins can perform this action.");
  }

  return true;
}
