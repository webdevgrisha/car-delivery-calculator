import admin from "../init";
import {CallableRequest, onCall} from "firebase-functions/v2/https";
import {checkAdminRole} from "../checkAdminRole";
import {DEFAULT_CONFIGURATION_ID} from "./configurationPath";

interface DeleteConfigurationData {
  configurationId: string;
}

export const deleteCalculatorConfiguration = onCall(
  async (request: CallableRequest<DeleteConfigurationData>) => {
    checkAdminRole(request);

    const configurationId = request.data.configurationId;
    if (!configurationId || configurationId === DEFAULT_CONFIGURATION_ID) {
      return {error: "Default configuration cannot be deleted"};
    }
    if (!/^[^/]{1,200}$/.test(configurationId)) {
      return {error: "Invalid configuration id"};
    }

    const firestore = admin.firestore();
    const configurationRef = firestore
      .collection("calculator_configurations")
      .doc(configurationId);
    const configuration = await configurationRef.get();
    if (!configuration.exists) {
      return {error: "Configuration does not exist"};
    }

    await firestore.recursiveDelete(configurationRef);
    return {configurationId};
  }
);
