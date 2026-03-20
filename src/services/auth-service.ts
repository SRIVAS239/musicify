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

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const scope = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
].join(" ");

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export async function initiateLogin() {
  const verifier = generateRandomString(64);
  const hashed = await sha256(verifier);
  const challenge = base64encode(hashed);

  sessionStorage.setItem("pkce_verifier", verifier);

  // 4. Send user to Spotify with the CHALLENGE (not verifier)
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
    code_challenge_method: "S256",
    code_challenge: challenge, // hashed version only
    scope: scope,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

export async function exchangeCode(
  code: string,
  verifier: string,
): Promise<{
  token_type: string | null;
  scope: string | null;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
      client_id: process.env.SPOTIFY_CLIENT_ID || "",
      code_verifier: verifier, // the original key — Spotify hashes it and checks it matches the lock
    }),
  });
  if (!res.ok) throw new Error(`Exchange failed: ${res.status}`);
  return res.json();
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID || "",
    }),
  });
  if (!res.ok) throw new Error(`Refresh failed: ${res.status}`);
  return res.json();
}

export async function fetchMe(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`fetchMe failed: ${res.status}`);
  return res.json();
}
