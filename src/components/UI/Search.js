import { useDispatch, useSelector } from "react-redux";
import { searchAll, setQuery } from "../../store/searchSlice";

const token = "BQD2U49HYlBamN1Z133Y9irnUDcGYRUWm5zpzeOHF_WcwAqefc8I5WxnZNwBkg2n_2YqIo3FubMtUgiJezWlCCO8xL_3V25FgxKdPVFCeKpbopaFG06WpaZkyVPvxr0VbBUzTHXYk7Q";

const Search = () => {
  const dispatch = useDispatch();
  const { query, tracks, artists, albums, loading, error } = useSelector(
    (state) => state.search
  );

  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const onSearch = () => {
    if (!query.trim()) return;

    dispatch(searchAll({ query, token }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          className="bg-gray-100 rounded-s w-96 h-8 p-2"
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="text-red-500 mt-2">Error: {error}</div>}

      {/* Display results */}
      {tracks.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Tracks ({tracks.length})</h3>
          {/* Add your track display logic here */}
        </div>
      )}

      {artists.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Artists ({artists.length})</h3>
          {/* Add your artist display logic here */}
        </div>
      )}

      {albums.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Albums ({albums.length})</h3>
          {/* Add your album display logic here */}
        </div>
      )}
    </>
  );
};

export default Search;