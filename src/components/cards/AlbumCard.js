import {CARD_BASE_URL} from "../../utils/constants";
import Button from "../UI/Button";
const styleCard = {
    // backgroundColor: "#fdedef",
}

const AlbumCard = (props)=>{
    
    console.log("Props object log", props);
    //destructing
    const {name, costForTwo, cloudinaryImageId, avgRating} = props?.card?.card?.card?.info;

    return (
        // <div className = "m-4 p-4 border-gray-500 rounded-b-lg w-[200]" style={styleCard}>
        <div className = "m-6 border shadow-xs border-gray-200 rounded-lg w-[240px] hover:shadow-2xl hover:cursor-pointer transition-shadow duration-300">
        
            <div className = "">
                <img className="h-56 rounded-tr-lg rounded-tl-lg" 
                src={CARD_BASE_URL + cloudinaryImageId} alt=""/>
            </div>
            <div className = " p-4">
                <div className="resto-card-details-name">
                    <h2>{name}</h2>
                </div>
                <div className="resto-card-details-subtitle">
                    <h3>{avgRating}</h3>
                </div>
                name, cusine, delivery time, rating
                <div className="resto-card-details-subtitle">
                    {costForTwo} 
                </div>

            </div>
            <div className="p-4">
                <Button text="Add to cart" />
            </div>

        </div>
    );
}

export default AlbumCard;