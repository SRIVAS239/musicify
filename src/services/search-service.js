import { SPOTIFY_BASE_URL } from "../utils/constants";

export const searchTracks = async (query, token) => {
  const res = await fetch(
    `${SPOTIFY_BASE_URL}/search?q=${query}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Spotify API error (${res.status}): ${errorText.substring(0, 100)}`);
  }

  return res.json();
};