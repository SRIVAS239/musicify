// src/types/window.d.ts
export type { SpotifyPlayer }

interface SpotifyPlayer {
  connect(): Promise<boolean>
  disconnect(): void
  addListener(event: string, callback: (...args: unknown[]) => void): void
  removeListener(event: string): void
  getCurrentState(): Promise<unknown>
  setName(name: string): Promise<void>
  getVolume(): Promise<number>
  setVolume(volume: number): Promise<void>
  pause(): Promise<void>
  resume(): Promise<void>
  togglePlay(): Promise<void>
  seek(positionMs: number): Promise<void>
  previousTrack(): Promise<void>
  nextTrack(): Promise<void>
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: {
      Player: new (options: {
        name:          string
        getOAuthToken: (cb: (token: string) => void) => void
        volume?:       number
      }) => SpotifyPlayer
    }
  }
}
