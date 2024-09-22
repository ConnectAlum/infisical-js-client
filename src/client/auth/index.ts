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