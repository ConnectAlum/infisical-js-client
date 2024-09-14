import { Auth } from "@/client/auth";

export type UniversalAuth = { universalAuth: { clientId: string; clientSecret: string; } }

type UniversalAuthResponse = {
  accessToken: string;
  expiresIn: number; // seconds
  accessTokenMaxTTL: number;
  tokenType: "Bearer" | string;
}

export class UniversalAuthImpl implements Auth<UniversalAuth> {
  currentAuth: {expire: Date; resp: UniversalAuthResponse} | null = null;
  constructor(public auth: UniversalAuth, public siteUrl: string) { }
  getAccessToken(): Promise<string> {
    if (this.currentAuth) {
      const { expire, resp } = this.currentAuth;
      // check if the token is still valid
      const now = Date.now();
      if (expire.getTime() > now) {
        return Promise.resolve(resp.accessToken);
      }
      // token is expired, refresh it
      const endpoint = `${this.siteUrl}/api/v1/auth/token/renew`;
      const body = JSON.stringify({ accessToken: resp.accessToken });
      return fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      }).then(response => response.json()).then((json: UniversalAuthResponse) => {
        this.currentAuth = {
          expire: new Date(Date.now() + json.expiresIn * 1000),
          resp
        }
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
    this.currentAuth = {
      expire: new Date(Date.now() + json.expiresIn * 1000),
      resp: json
    }
    console.log("Authenticated with universal auth");
    console.log(json)
    return json.accessToken;
  }
  
}