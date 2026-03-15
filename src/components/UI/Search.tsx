import { useDispatch, useSelector } from "react-redux";
import { searchAll } from "../../store/searchSlice";
import { useState, useEffect } from "react";
import { clearSearch } from "../../store/searchSlice";
import SearchModal from "./SearchModal";
import { RootState, AppDispatch } from "../../utils/appStore";

const Search: React.FC = () => {
  const [query, setQueryLocal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.search);

  // Debounce search input
  useEffect(() => {
    console.log("Query changed:", query);
    setShowModal(true);
    const timer = setTimeout(() => {
      if (!query.trim()) {
        dispatch(clearSearch());
        return;
      }
      dispatch(searchAll({ query }));
    }, 300);
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
          className="bg-gray-100 rounded-s w-96 h-8 p-2"
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={(e) => setQueryLocal(e.target.value)}
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

      {showModal && <SearchModal />}
    </>
  );
};

export default Search;
