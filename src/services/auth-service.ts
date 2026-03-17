import { AUTH_URL } from "../utils/constants";
import { TokenResponse } from "../types/spotify";

export const getToken = async (): Promise<string | undefined> => {
  try {
    const payload = {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      client_secret: process.env.REACT_APP_CLIENT_SECRET || "",
    };

    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    const data: TokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return undefined;
  }
};

const generateRandomString = (length:number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);
