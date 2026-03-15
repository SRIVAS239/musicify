// Component prop types
import { SpotifyAlbum, SpotifyTrack, SpotifyArtist } from './spotify';
import { ReactNode } from 'react';

export interface AlbumCardProps {
  data: SpotifyAlbum;
}

export interface TrackCardProps {
  data: SpotifyTrack;
}

export interface ArtistCardProps {
  data: SpotifyArtist;
}

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface PlayButtonProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

export interface StatusIndicatorProps {
  status: 'online' | 'offline';
}

export interface UserClassProps {
  name: string;
}

export interface UserClassState {
  descInfo: {
    description: string;
    count: string;
  };
}
