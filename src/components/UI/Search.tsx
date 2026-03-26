import { useDispatch, useSelector } from "react-redux";
import { searchAll } from "../../store/searchSlice";
import { useState, useEffect } from "react";
import { clearSearch } from "../../store/searchSlice";
import SearchModal from "./SearchModal";
import { RootState, AppDispatch } from "../../utils/appStore";
import Button from "./Button";

const Search: React.FC = () => {
  const [query, setQueryLocal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.search);

  // Debounce search input
  useEffect(() => {
    console.log("Query changed:", query);
    const timer = setTimeout(() => {
      if (query) setShowModal(true);
      if (!query.trim()) {
        dispatch(clearSearch());
        return;
      }
      dispatch(searchAll({ query }));
    }, 500);
    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const onSearch = () => {
    if (!query.trim()) return;
    dispatch(searchAll({ query }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          className="bg-bg-elevated rounded-s w-96 h-8 p-2"
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={(e) => setQueryLocal(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <Button variant="ghost" size="md" onClick={onSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>

        {/* <button
          onClick={onSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button> */}
      </div>

      {error && <div className="text-red-500 mt-2">Error: {error}</div>}

      {/* {showModal && query.trim() && <SearchModal />} */}
    </>
  );
};

export default Search;
