import { Auth } from "@/client/auth";
import { Secret, StandardSecretQueryFilters } from "@/client/secrets";
import { FetchResourceError, sendGet } from "@/client/util";

export type GetSecretQuery = StandardSecretQueryFilters & {
  version?: number;
  type?: "shared" | "personal";

  secretName: string;
};
export type GetSecretResponse = {
  secrets: Secret[];
}

export const getSecret = (auth: Auth<any>): (query: GetSecretQuery) => Promise<Secret | null> => {
  return async (query) => {
    const { secretName, ...rest } = query;
    try {
      const resp = (await sendGet<{ secret: Secret } >(`/api/v3/secrets/raw/${secretName}`, auth, rest));
      return resp.secret;
    } catch (e) {
      if (e instanceof FetchResourceError && e.code === 400 &&
          (e.json.error === "CreateSecret" || (e.json.error === "BadRequest" && e.json.message === "Secret not found"))){ // resource not found
        return null;
      }
      throw e;
    }
  }
}