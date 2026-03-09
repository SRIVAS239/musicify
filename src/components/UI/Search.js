import { useState } from "react";
import { searchTracks } from "../../services/search-service.js";

const token = "BQCz1txliIrXQ1VnH8lhY7eGNvkClCnLRnfJMrYfd9xt4qNkMU5NCG9p2BTxQwFcAtm69tJ8xi4e0gOJHFm3tiXKMoRFKmkXGRFOo_FAA3mL7ithGskpWMf960DNOvHkLNci902KgUU";

const Search = () => {
  const [query, setQuery] = useState("");

  const onSearch = async () => {
    if (!query) return;

    try {
      const data = await searchTracks(query, token);
      console.log("Search results:", data);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };

  return (
    <>
      <input
        className="bg-gray-100 rounded-s w-96 h-8 p-2"
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={onSearch}>Search</button>
    </>
  );
};

export default Search;