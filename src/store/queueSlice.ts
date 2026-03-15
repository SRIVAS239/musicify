import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueState } from "../types/redux";

const initialState: QueueState = {
  items: ["what is love", "shape of you"],
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    incremented: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    decremented: (state) => {
      state.items.pop();
    },
    clearQueue: (state) => {
      state.items.length = 0;
    },
  },
});

export const { incremented, decremented, clearQueue } = queueSlice.actions;

export default queueSlice.reducer;
