import React from "react";
import Button from "../UI/Button";


const TrackCard = (props) => {
  console.log("TrackCard props:", props);
  const { name, album, artists, track_number, duration_ms } = props.data;
  return (
    <div className="h-24 w-full flex">
      <div>{name}</div>
      <div>{(duration_ms / 60000).toFixed(2)} mins</div>
      <Button type="primary" text="Play" />
      <Button type="secondary" text="Add to queue" />
    </div>
  );
};

export default TrackCard;
