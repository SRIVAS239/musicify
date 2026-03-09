import { CARD_BASE_URL } from "../../utils/constants";
import Button from "../UI/Button";
const styleCard = {
  // backgroundColor: "#fdedef",
};

const AlbumCard = (props) => {
  const albumData = props?.data;

  console.log("Props object log", props);
  //destructing
  // const {name, costForTwo, cloudinaryImageId, avgRating} = props?.card?.card?.card?.info;

  const { name, images, total_tracks, external_urls, release_date,type, artists, href, id } = albumData;
  console.log("nmae",name);

  return (
    // <div className = "m-4 p-4 border-gray-500 rounded-b-lg w-[200]" style={styleCard}>
    <div className="m-6 border shadow-xs border-gray-200 rounded-lg w-[240px] hover:shadow-2xl hover:cursor-pointer transition-shadow duration-300">
      <div className="">
        <img
          className="h-56 rounded-tr-lg rounded-tl-lg"
          src={images[0].url}
          alt=""
        />
      </div>
      <div className=" p-4">
        <div className="resto-card-details-name">
          <h2>{name}</h2>
        </div>
      </div>
      <div className="p-4">
        <Button text="Play" />
      </div>
    </div>
  );
};

export default AlbumCard;
