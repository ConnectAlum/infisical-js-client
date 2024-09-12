import { Auth } from "@/client/auth";

export type UniversalAuth = { universalAuth: { clientId: string; clientSecret: string; } }

type UniversalAuthResponse = {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: "Bearer" | string;
}

export class UniversalAuthImpl implements Auth<UniversalAuth> {
  currentAuth: UniversalAuthResponse | null = null;
  constructor(public auth: UniversalAuth, public siteUrl: string) { }
  getAccessToken(): Promise<string> {
    if (this.currentAuth) {
      // check if the token is still valid
      const now = Date.now();
      const expiresAt = this.currentAuth.expiresIn * 1000;
      if (now < expiresAt) {
        return Promise.resolve(this.currentAuth.accessToken);
      }
      // token is expired, refresh it
      const endpoint = `${this.siteUrl}/api/v1/auth/token/renew`;
      const body = JSON.stringify({ accessToken: this.currentAuth.accessToken });
      return fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      }).then(response => response.json()).then((json: UniversalAuthResponse) => {
        this.currentAuth = json;
        return json.accessToken;
      });
    }
    return this.authenticate();
  }
  async authenticate(): Promise<string> {
    const endpoint = `${this.siteUrl}/api/v1/auth/universal-auth/login`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.auth.universalAuth)
    });
    const json = await response.json() as UniversalAuthResponse;
    this.currentAuth = json;
    return json.accessToken;
  }
  
}