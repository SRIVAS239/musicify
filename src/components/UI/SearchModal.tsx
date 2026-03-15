import { useSelector } from "react-redux";
import { RootState } from "../../utils/appStore";

const SearchModal: React.FC = () => {
  const { artists, albums, tracks } = useSelector(
    (store: RootState) => store.search
  );

  return (
    <div className="w-[600px] h-[600px] bg-amber-50">
      Search Modal
      <div>
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
      </div>
    </div>
  );
};

export default SearchModal;
