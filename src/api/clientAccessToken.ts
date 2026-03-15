// Client Access Token for Spotify API
import { AUTH_URL } from "../utils/constants";


let token: string | null = null;
let expiresAt = 0;

export async function getAppToken(): Promise<string> {
  if (token && Date.now() < expiresAt - 60_000) return token;

  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'client_credentials',
      client_id:     process.env.SPOTIFY_CLIENT_ID || '',
      client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
    })
  });
  
  const data = await res.json();
  token     = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000;
  return token!;
}


export {};
