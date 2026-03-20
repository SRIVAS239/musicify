import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SpotifyTrack } from "../types/spotify";

interface PlayerState {
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  progressMs: number; // current position in ms
  durationMs: number; // total duration in ms
  volume: number; // 0 to 1
  deviceId: string | null; // SDK device ID — Premium only
  isPremiumMode: boolean; // true = SDK, false = preview_url audio
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  progressMs: 0,
  durationMs: 0,
  volume: 0.8,
  deviceId: null,
  isPremiumMode: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<SpotifyTrack>) => {
      state.currentTrack = action.payload;
      state.progressMs = 0;
      state.durationMs = action.payload.duration_ms;
      state.isPlaying = true;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progressMs = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    setIsPremiumMode: (state, action: PayloadAction<boolean>) => {
      state.isPremiumMode = action.payload;
    },
    clearPlayer: () => initialState,
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setProgress,
  setVolume,
  setDeviceId,
  setIsPremiumMode,
  clearPlayer,
} = playerSlice.actions;
export default playerSlice.reducer;
