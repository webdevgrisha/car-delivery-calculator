import admin from "../init";
import {CallableRequest, onCall} from "firebase-functions/v2/https";
import {checkAdminRole} from "../checkAdminRole";
import {
  CONFIGURATION_TABLES,
  configurationCollectionPath,
} from "./configurationPath";

interface CreateConfigurationData {
  name: string;
  sourceConfigurationId?: string;
}

export const createCalculatorConfiguration = onCall(
  async (request: CallableRequest<CreateConfigurationData>) => {
    checkAdminRole(request);

    const name = request.data.name?.trim();
    const sourceConfigurationId =
      request.data.sourceConfigurationId || "default";
    if (!name) return {error: "Configuration name is required"};
    if (name.length > 80) return {error: "Configuration name is too long"};

    const firestore = admin.firestore();
    if (sourceConfigurationId !== "default") {
      const source = await firestore.collection("calculator_configurations")
        .doc(sourceConfigurationId).get();
      if (!source.exists) {
        return {error: "Source configuration does not exist"};
      }
    }

    const configurationRef = firestore
      .collection("calculator_configurations").doc();
    const batch = firestore.batch();
    batch.set(configurationRef, {
      name,
      createdAt: new Date(),
      copiedFrom: sourceConfigurationId,
    });

    for (const tableName of CONFIGURATION_TABLES) {
      const sourcePath = configurationCollectionPath(
        sourceConfigurationId,
        tableName
      );
      const sourceRows = await firestore.collection(sourcePath).get();
      sourceRows.docs.forEach((row) => {
        const targetRow = configurationRef.collection(tableName).doc(row.id);
        batch.set(targetRow, row.data());
      });
    }

    await batch.commit();
    return {configuration: {id: configurationRef.id, name}};
  }
);
