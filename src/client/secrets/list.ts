import { Auth } from "@/client/auth"
import { Import, Secret, StandardSecretQueryFilters } from "@/client/secrets";
import { sendGet } from "@/client/util";

export type ListSecretsQuery = StandardSecretQueryFilters & {
  recursive?: boolean;
  tagSlugs?: string[];
}
export type ListSecretsResponse = {
  secrets: Secret[];
  imports: Import[];
}
export const listSecrets = (auth: Auth<any>): (query: ListSecretsQuery) => Promise<ListSecretsResponse> => {
  return (query) => {
    return sendGet<ListSecretsResponse>("/api/v3/secrets/raw", auth, query)
  }
}
