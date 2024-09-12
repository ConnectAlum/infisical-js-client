import { Auth } from "@/client/auth";
import { Secret, StandardSecretQueryFilters } from "@/client/secrets";
import { sendGet } from "@/client/util";

export type GetSecretQuery = StandardSecretQueryFilters & {
  version?: number;
  type?: "shared" | "personal";

  secretName: string;
};
export type GetSecretResponse = {
  secrets: Secret[];
}

export const getSecret = (auth: Auth<any>): (query: GetSecretQuery) => Promise<Secret> => {
  return async (query) => {
    const { secretName, ...rest } = query;
    return (await sendGet<{ secret: Secret } >(`/api/v3/secrets/raw/${secretName}`, auth, rest)).secret;
  }
}