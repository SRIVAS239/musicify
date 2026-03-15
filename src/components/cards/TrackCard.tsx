import React from "react";
import Button from "../UI/Button";
import PlayButton from "../UI/PlayButton";
import { TrackCardProps } from "../../types/components";

const TrackCard: React.FC<TrackCardProps> = ({ data }) => {
  console.log("TrackCard props:", data);
  const { name, album, artists, duration_ms } = data;
  console.log(album, artists);

  return (
    <div className="h-24 w-full flex">
      <div>
        <img src={album.images[0].url} alt={album.name} className="h-20 w-20" />
      </div>
      <div>{name}</div>
      <div>{(duration_ms / 60000).toFixed(2)} mins</div>
      <PlayButton />
      <Button type="secondary" text="Add to queue" />
    </div>
  );
};

export default TrackCard;
