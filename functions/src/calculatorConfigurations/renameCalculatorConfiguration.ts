import admin from "../init";
import {CallableRequest, onCall} from "firebase-functions/v2/https";
import {checkAdminRole} from "../checkAdminRole";
import {DEFAULT_CONFIGURATION_ID} from "./configurationPath";

interface RenameConfigurationData {
  configurationId: string;
  name: string;
}

export const renameCalculatorConfiguration = onCall(
  async (request: CallableRequest<RenameConfigurationData>) => {
    checkAdminRole(request);

    const configurationId = request.data.configurationId;
    const name = request.data.name?.trim();
    if (!configurationId || configurationId === DEFAULT_CONFIGURATION_ID) {
      return {error: "Default configuration cannot be renamed"};
    }
    if (!/^[^/]{1,200}$/.test(configurationId)) {
      return {error: "Invalid configuration id"};
    }
    if (!name) return {error: "Configuration name is required"};
    if (name.length > 80) {
      return {error: "Configuration name is too long"};
    }

    const configurationRef = admin.firestore()
      .collection("calculator_configurations")
      .doc(configurationId);
    const configuration = await configurationRef.get();
    if (!configuration.exists) {
      return {error: "Configuration does not exist"};
    }

    await configurationRef.update({name, updatedAt: new Date()});
    return {configuration: {id: configurationId, name}};
  }
);
