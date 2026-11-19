import admin from "../init";
import {CallableRequest, onCall} from "firebase-functions/v2/https";

export interface CalculatorConfiguration {
  id: string;
  name: string;
}

export const getCalculatorConfigurations = onCall(
  async (request: CallableRequest) => {
    if (!request.auth) return {error: "User is not authenticated"};

    const snapshot = await admin.firestore()
      .collection("calculator_configurations")
      .orderBy("createdAt", "asc")
      .get();

    const configurations: CalculatorConfiguration[] = [
      {id: "default", name: "Default"},
    ];

    snapshot.docs.forEach((document) => {
      const data = document.data();
      configurations.push({id: document.id, name: String(data.name || "")});
    });

    return {configurations};
  }
);
