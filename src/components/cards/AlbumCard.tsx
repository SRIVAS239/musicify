import React from "react";
import Button from "../UI/Button";
import { AlbumCardProps } from "../../types/components";

const AlbumCard: React.FC<AlbumCardProps> = ({ data: albumData }) => {
  const { name, images } = albumData;
  console.log("name", name);

  return (
    <div className="m-6 border shadow-xs border-gray-200 rounded-lg w-[240px] hover:shadow-2xl hover:cursor-pointer transition-shadow duration-300">
      <div className="">
        <img
          className="h-56 rounded-tr-lg rounded-tl-lg"
          src={images[0].url}
          alt={name}
        />
      </div>
      <div className=" p-4">
        <div className="resto-card-details-name">
          <h2>{name}</h2>
        </div>
      </div>
      <div className="p-4">
        <Button variant="primary" size="md">
          Play
        </Button>
      </div>
    </div>
  );
};

export default AlbumCard;
