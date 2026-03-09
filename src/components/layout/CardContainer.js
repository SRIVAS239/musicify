import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AlbumCard from "../cards/AlbumCard";
import TrackCard from "../cards/TrackCard";

const CardContainer = () => {
  const cardData = useSelector((store) => store.search.albums);
  console.log("CardContainer data:", cardData);

  const trackData = useSelector((store) => store.search.tracks);
  console.log("CardContainer track data:", trackData);

  return (
    <div>
      {cardData && cardData.length > 0 ? (
        <>
          <h2>Albums</h2>
          {cardData.map((album, id) => {
            return <AlbumCard data={album} key={id} />;
          })}
        </>
      ) : null}
      {trackData && trackData.length > 0 ? (
        <>
          <h2>Tracks</h2>
          {trackData.map((track, id) => {
            return <TrackCard data={track} key={id} />;
          })}
        </>
      ) : null}
    </div>
  );
};

export default CardContainer;
