import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueState } from "../types/redux";
import { SpotifyTrack } from "../types/spotify";

const initialState: QueueState = {
  items: [],
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<SpotifyTrack>) => {
      state.items.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(track => track.id !== action.payload);
    },
    clearQueue: (state) => {
      state.items = [];
    },
  },
});

export const { addToQueue, removeFromQueue, clearQueue } = queueSlice.actions;

export default queueSlice.reducer;
