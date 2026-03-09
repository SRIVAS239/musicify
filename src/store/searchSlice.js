const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    tracks: [],
    artists: [],
    albums: [],
    loading: false,
    error: null,
  },
  setQuery: (state, action) => {
    state.query = action.payload;
  },

  clearSearch: (state) => {
    state.tracks = [];
    state.artists = [];
    state.albums = [];
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;

