import { Auth } from "@/client/auth";
import { TokenAuth, TokenAuthImpl } from "@/client/auth/token";
import { UniversalAuth, UniversalAuthImpl } from "@/client/auth/universal";
import { getSecret } from "@/client/secrets/get";
import { listSecrets } from "@/client/secrets/list";

export type InfisicalClientOptions = {
  siteUrl: string;
  auth: UniversalAuth | TokenAuth | (() => Promise<string>);
}
export const createInfisicalClient = (options: InfisicalClientOptions) => {
  // remove the trailing slash from the site URL
  if (options.siteUrl.endsWith("/")) {
    options.siteUrl = options.siteUrl.slice(0, -1);
  }

  let auth: Auth<any> | null = null;
  const getAuthImpl = () => {
    if (!auth) {
      if ("universalAuth" in options.auth) {
        auth = new UniversalAuthImpl(options.auth, options.siteUrl);
      } else if ("accessToken" in options.auth) {
        auth = new TokenAuthImpl(options.auth, options.siteUrl);
      } else if (typeof options.auth === "function") {
        auth = {
          auth: {},
          siteUrl: options.siteUrl,
          authenticate: options.auth,
          getAccessToken: options.auth
        }
      } else throw new Error("Invalid auth option");
    }
    return auth;
  }
  return {
    getAccessToken: () => getAuthImpl().getAccessToken(),
    listSecrets: listSecrets(getAuthImpl()),
    getSecret: getSecret(getAuthImpl())
  }
}