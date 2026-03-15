// Spotify API type definitions

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  images?: SpotifyImage[];
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  type: string;
  uri: string;
  href: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  artists: SpotifyArtist[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  type: string;
  uri: string;
  href: string;
  track_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
}

export interface SearchResponse {
  tracks: SpotifyTrack[];
  artists: SpotifyArtist[];
  albums: SpotifyAlbum[];
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
