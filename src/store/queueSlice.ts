import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueState } from "../types/redux";
import { SpotifyTrack } from "../types/spotify";

const initialState: QueueState = {
  items: [],
  currentIndex: -1,
  originalOrder: [],
  isShuffled: false,
};

// Fisher-Yates shuffle algorithm
const fisherYatesShuffle = (array: SpotifyTrack[]): SpotifyTrack[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<SpotifyTrack>) => {
      state.items.push(action.payload);
      if (!state.isShuffled) {
        state.originalOrder.push(action.payload);
      }
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.items.findIndex(track => track.id === action.payload);
      if (indexToRemove !== -1) {
        state.items = state.items.filter(track => track.id !== action.payload);
        state.originalOrder = state.originalOrder.filter(track => track.id !== action.payload);
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
      state.originalOrder = [];
      state.isShuffled = false;
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
    shuffleQueue: (state) => {
      if (!state.isShuffled && state.items.length > 0) {
        // Save original order before shuffling
        state.originalOrder = [...state.items];
        
        // Get the current track if any
        const currentTrack = state.currentIndex >= 0 ? state.items[state.currentIndex] : null;
        
        // Shuffle the queue
        state.items = fisherYatesShuffle(state.items);
        
        // Update current index to match the shuffled position of the current track
        if (currentTrack) {
          state.currentIndex = state.items.findIndex(track => track.id === currentTrack.id);
        }
        
        state.isShuffled = true;
      }
    },
    unshuffleQueue: (state) => {
      if (state.isShuffled && state.originalOrder.length > 0) {
        // Get the current track if any
        const currentTrack = state.currentIndex >= 0 ? state.items[state.currentIndex] : null;
        
        // Restore original order
        state.items = [...state.originalOrder];
        
        // Update current index to match the original position of the current track
        if (currentTrack) {
          state.currentIndex = state.items.findIndex(track => track.id === currentTrack.id);
        }
        
        state.isShuffled = false;
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
  previousTrack,
  shuffleQueue,
  unshuffleQueue
} = queueSlice.actions;

export default queueSlice.reducer;
