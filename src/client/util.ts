import { Auth } from "@/client/auth";

export class FetchResourceError extends Error {
  constructor(message: string, public code: number, public json: any) {
    super(message);
  }
}

export const sendGet = async <T>(url: string, auth: Auth<any>, query: Record<string, string | string[] | number | boolean>) => {
  const accessToken = await auth.getAccessToken();
  const normalizedQuery = Object.entries(query).reduce((acc, [key, value]) => {
    if (value === undefined) {
      return acc;
    }
    if (Array.isArray(value)) {
      return { ...acc, [key]: value.join(",") };
    }
    return { ...acc, [key]: value };
  }, {});
  const queryString = new URLSearchParams(normalizedQuery).toString();
  const response = await fetch(`${auth.siteUrl}${url}${queryString ? `?${queryString}` : ""}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new FetchResourceError(`Failed to fetch ${url}: ${response.statusText} - ${JSON.stringify(json)}`, response.status, json);
  }
  return json as T;
}

type BodyMethod = "POST" | "PUT" | "DELETE";
export const sendWithBody = async <T>(url: string, method: BodyMethod, auth: Auth<any>, body: any) => {
  const accessToken = await auth.getAccessToken();
  const response = await fetch(`${auth.siteUrl}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new FetchResourceError(`Failed to fetch ${url}: ${response.statusText} - ${JSON.stringify(json)}`, response.status, json);
  }
  return json as T;
}