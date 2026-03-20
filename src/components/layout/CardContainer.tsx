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
    <div>
      {cardData && cardData.length > 0 ? (
        <>
          <h2>Albums</h2>
          <div className="flex flex-wrap gap-2">
            {cardData.map((album, id: number) => {
              return <AlbumCard data={album} key={id} />;
            })}
          </div>
        </>
      ) : null}
      {trackData && trackData.length > 0 ? (
        <>
          <h2>Tracks</h2>
          <div className="flex flex-wrap gap-2">
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
