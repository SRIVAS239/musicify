// src/types/window.d.ts
export {}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: {
      Player: new (options: {
        name:          string
        getOAuthToken: (cb: (token: string) => void) => void
        volume?:       number
      }) => any
    }
  }
}
