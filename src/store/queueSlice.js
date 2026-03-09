import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "counter",
  initialState: {
    items: ["what is love,","shape of you"],
  },
  reducers: {
    incremented: (state, action) => {
      state.items.push(action.payload);
    },
    decremented: (state, action) => {
      state.items.pop(action.payload);
    },
    clearQueue: (state) => {
        state.items.length = 0;
    }
  },
});

export const { incremented, decremented, clearQueue } = queueSlice.actions;

export default queueSlice.reducer;
