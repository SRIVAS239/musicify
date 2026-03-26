import React from "react";
import { useSelector } from "react-redux";
import AlbumCard from "../cards/AlbumCard";
import TrackCard from "../cards/TrackCard";
import { RootState } from "../../utils/appStore";

const CardContainer: React.FC = () => {
  const cardData = useSelector((store: RootState) => store.search.albums);
  console.log("CardContainer data:", cardData);

  const trackData = useSelector((store: RootState) => store.search.tracks);
  console.log("CardContainer track data:", trackData);

  return (
    <div className="p-6 overflow-hidden">
      {cardData && cardData.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <div className="flex flex-wrap gap-4 overflow-hidden">
            {cardData.map((album, id: number) => {
              return <AlbumCard data={album} key={id} />;
            })}
          </div>
        </>
      ) : null}
      {trackData && trackData.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-8">Tracks</h2>
          <div className="flex flex-wrap gap-4 overflow-hidden">
            {trackData.map((track, id: number) => {
              return <TrackCard data={track} key={id} />;
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CardContainer;
