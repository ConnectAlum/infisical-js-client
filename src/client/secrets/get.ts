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
    const data = await sendGet<GetSecretResponse>("/api/v3/secrets/raw", auth, rest);
    return data.secrets.filter((s) => s.secretKey === secretName)?.[0];
  }
}