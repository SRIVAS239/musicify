import React, { useState, useEffect } from "react";
import Button from "../UI/Button";

function Player(props: any) {
  const track = {
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
  };
    const [current_track, setCurrentTrack] = useState(track);
  return (
    <>
      <div className="now-playing__container">
        <div className="now-playing__main-wrapper">
            <div>
                <Button variant="primary" size="md" onClick={() => console.log("Play button clicked")}>
                    Play
                </Button>
            </div>
          {/* <img
            src={current_track.album.images[0].url}
            // className="now-playing__cover"
            alt=""
          /> */}

          <div className="now-playing__side">
            <div 
            // className="now-playing__name"
            >{current_track.name}jk</div>

            <div 
            // className="now-playing__artist"
            >
              {current_track.artists[0].name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
