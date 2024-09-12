import { TokenAuth, TokenAuthImpl } from "@/client/auth/token";
import { UniversalAuth, UniversalAuthImpl } from "@/client/auth/universal";


export interface Auth<T> {
  auth: T;
  siteUrl: string;

  /**
   * Authenticate the client with the server.
   * @returns The access token.
   */
  authenticate(): Promise<string>;

  /**
   * Returns the access token, authenticating if necessary.
   * @returns The access token.
   */
  getAccessToken(): Promise<string>;
}

export const getAuthImplementation = (auth: UniversalAuth | TokenAuth, siteUrl: string): Auth<UniversalAuth> | Auth<TokenAuth> => {
  if ("universalAuth" in auth) {
    return new UniversalAuthImpl(auth, siteUrl);
  }
  return new TokenAuthImpl(auth, siteUrl);
}