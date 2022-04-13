import {
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { MissingSecretError } from "./errors";

let secretsManagerClient: SecretsManagerClient;

/**
 * Get a secret value based on the Secret Name
 * 
 * @param {string} secretName 
 * @returns {Promise<string>}
 */
export async function getSecretValue(secretName: string): Promise<string> {
  if (!secretsManagerClient)
    secretsManagerClient = new SecretsManagerClient({ region: "us-east-1" });

  return secretsManagerClient
    .send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    )
    .then(({ SecretString }: GetSecretValueCommandOutput) => {
      if (!SecretString) throw new MissingSecretError();
      return SecretString;
    });
}
