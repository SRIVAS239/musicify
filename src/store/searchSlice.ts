import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { searchTracks } from "../services/search-service";
import { SearchState } from "../types/redux";
import { SearchResponse } from "../types/spotify";
import { getAppToken } from "../api/clientAccessToken";

interface SearchAllParams {
  query: string;
}

// Async thunk for searching tracks, artists, and albums
export const searchAll = createAsyncThunk<
  SearchResponse,
  SearchAllParams,
  { rejectValue: string }
>(
  "search/searchAll",
  async ({ query }, { rejectWithValue }) => {
    try {
      // Fetch token on-demand (cached internally)
      const token = await getAppToken();
      const data = await searchTracks(query, token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

const initialState: SearchState = {
  query: "",
  tracks: [],
  artists: [],
  albums: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.tracks = [];
      state.artists = [];
      state.albums = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload.tracks || [];
        state.artists = action.payload.artists || [];
        state.albums = action.payload.albums || [];
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
