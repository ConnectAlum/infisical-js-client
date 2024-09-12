import { InfisicalClientOptions } from "@/client";
import { Auth } from "@/client/auth";
import { Secret, StandardSecretQueryFilters } from "@/client/secrets";
import { sendGet } from "@/client/util";

export type GetSecretQuery = StandardSecretQueryFilters & {
  version?: number;
  type?: "shared" | "personal";

  secretName: string;
};
export type GetSecretResponse = {
  secret: Secret;
}
export const getSecret = (auth: Auth<any>): (query: GetSecretQuery) => Promise<GetSecretResponse> => {
  return (query) => {
    const { secretName, ...rest } = query;
    return sendGet<GetSecretResponse>("/api/v3/secrets/raw", auth, rest)
  }
}