import { SPOTIFY_BASE_URL } from "../utils/constants";

export const searchTracks = async (query, token) => {
  const res = await fetch(
    `${SPOTIFY_BASE_URL}/search?q=${query}&type=track,album,artist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Spotify API error (${res.status}): ${errorText.substring(0, 100)}`,
    );
  }

  const data = await res.json();

  return {
    tracks: data.tracks.items,
    artists: data.artists.items,
    albums: data.albums.items,
  };
};
