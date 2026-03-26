// Redux store types
import { SpotifyTrack, SpotifyArtist, SpotifyAlbum } from './spotify';

export interface QueueState {
  items: SpotifyTrack[];
  currentIndex: number;
  originalOrder: SpotifyTrack[];
  isShuffled: boolean;
}

export interface SearchState {
  query: string;
  tracks: SpotifyTrack[];
  artists: SpotifyArtist[];
  albums: SpotifyAlbum[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  queue: QueueState;
  search: SearchState;
}

export interface AuthState{
  accessToken: string | null;
  expiresAt: number | null;
  scope: string | null;
  tokenType: string | null;
}
