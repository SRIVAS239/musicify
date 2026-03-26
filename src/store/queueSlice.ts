import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueState } from "../types/redux";
import { SpotifyTrack } from "../types/spotify";

const initialState: QueueState = {
  items: [],
  currentIndex: -1,
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<SpotifyTrack>) => {
      state.items.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.items.findIndex(track => track.id === action.payload);
      if (indexToRemove !== -1) {
        state.items = state.items.filter(track => track.id !== action.payload);
        // Adjust current index if needed
        if (state.currentIndex > indexToRemove) {
          state.currentIndex--;
        } else if (state.currentIndex === indexToRemove) {
          state.currentIndex = -1;
        }
      }
    },
    clearQueue: (state) => {
      state.items = [];
      state.currentIndex = -1;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state) => {
      if (state.currentIndex < state.items.length - 1) {
        state.currentIndex++;
      }
    },
    previousTrack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
  },
});

export const { 
  addToQueue, 
  removeFromQueue, 
  clearQueue, 
  setCurrentIndex,
  nextTrack,
  previousTrack 
} = queueSlice.actions;

export default queueSlice.reducer;
