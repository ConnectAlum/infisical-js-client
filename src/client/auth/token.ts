import { Auth } from "@/client/auth";

export type TokenAuth = { accessToken: string; }

export class TokenAuthImpl implements Auth<TokenAuth> {
  constructor(public auth: TokenAuth, public siteUrl: string) { }
  async authenticate(): Promise<string> {
    return this.auth.accessToken;
  }
  async getAccessToken(): Promise<string> {
    return this.auth.accessToken;
  }
}