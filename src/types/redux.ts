// Redux store types
import { SpotifyTrack, SpotifyArtist, SpotifyAlbum } from './spotify';

export interface QueueState {
  items: string[];
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
