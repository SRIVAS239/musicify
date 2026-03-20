import { useSelector } from "react-redux";
import { RootState } from "../../utils/appStore";
import TrackCard from "../cards/TrackCard";

const SearchModal: React.FC = () => {
  const { artists, albums, tracks, loading } = useSelector(
    (store: RootState) => store.search
  );

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-4 p-4">
        <p className="text-gray-400">Searching...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      {tracks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Tracks ({tracks.length})</h3>
          <div className="space-y-2">
            {tracks.map((track) => (
              <TrackCard key={track.id} data={track} />
            ))}
          </div>
        </div>
      )}

      {artists.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Artists ({artists.length})</h3>
          {/* Add your artist display logic here */}
        </div>
      )}

      {albums.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Albums ({albums.length})</h3>
          {/* Add your album display logic here */}
        </div>
      )}

      {tracks.length === 0 && artists.length === 0 && albums.length === 0 && (
        <p className="text-gray-400">No results found</p>
      )}
    </div>
  );
};

export default SearchModal;
