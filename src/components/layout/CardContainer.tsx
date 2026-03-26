import React from "react";
import { useSelector } from "react-redux";
import AlbumCard from "../cards/AlbumCard";
import TrackCard from "../cards/TrackCard";
import { RootState } from "../../utils/appStore";

const CardContainer: React.FC = () => {
  const cardData = useSelector((store: RootState) => store.search.albums);
  const trackData = useSelector((store: RootState) => store.search.tracks);
  const loading = useSelector((store: RootState) => store.search.loading);
  const error = useSelector((store: RootState) => store.search.error);

  console.log("CardContainer data:", cardData);
  console.log("CardContainer track data:", trackData);

  return (
    <div className="p-6 pb-32 overflow-hidden">
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading music...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 p-4">
          <p>Error loading content: {error}</p>
        </div>
      )}

      {!loading && !error && cardData.length === 0 && trackData.length === 0 && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center text-gray-400">
            <p className="text-xl mb-2">No music found</p>
            <p className="text-sm">Try searching for your favorite songs, artists, or albums</p>
          </div>
        </div>
      )}

      {!loading && trackData && trackData.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          <div className="flex flex-wrap gap-4 overflow-hidden">
            {trackData.map((track, id: number) => {
              return <TrackCard data={track} key={id} />;
            })}
          </div>
        </>
      )}
      
      {!loading && cardData && cardData.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-8">Albums</h2>
          <div className="flex flex-wrap gap-4 overflow-hidden">
            {cardData.map((album, id: number) => {
              return <AlbumCard data={album} key={id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CardContainer;
