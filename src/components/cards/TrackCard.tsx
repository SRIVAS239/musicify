import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/appStore";
import { addToQueue } from "../../store/queueSlice";
import Button from "../UI/Button";
import PlayButton from "../UI/PlayButton";
import { TrackCardProps } from "../../types/components";
import { useSpotifyPlayer } from "../../hooks/useSpotifySDK";
import { usePlayer } from "../../hooks/storeHooks";

const TrackCard: React.FC<TrackCardProps> = ({ data }) => {
  const { name, album, artists, duration_ms } = data;
  const { play, pause, resume } = useSpotifyPlayer();
  const { currentTrack, isPlaying } = usePlayer();
  const dispatch = useDispatch<AppDispatch>();
  
  const isCurrentTrack = currentTrack?.id === data.id;

  const handlePlayClick = () => {
    console.log('Play button clicked for:', data.name);
    console.log('Has preview_url:', !!data.preview_url);
    if (isCurrentTrack && isPlaying) {
      console.log('Pausing current track');
      pause();
    } else if (isCurrentTrack && !isPlaying) {
      console.log('Resuming current track');
      resume();
    } else {
      console.log('Playing new track');
      play(data);
    }
  };

  const handleAddToQueue = () => {
    dispatch(addToQueue(data));
    console.log('Added to queue:', data.name);
  };

  return (
    <div className="h-24 w-full flex bg-bg-surface rounded-lg p-4 items-center gap-4">
      <div>
        <img src={album.images[0]?.url} alt={album.name} className="h-20 w-20 rounded" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-sm text-gray-400 truncate">
          {artists.map(a => a.name).join(', ')}
        </div>
      </div>
      <div className="text-sm text-gray-400">{(duration_ms / 60000).toFixed(2)} mins</div>
      <PlayButton onClick={handlePlayClick} />
      <Button variant="primary" size="md" onClick={handleAddToQueue}>
        Add to queue
      </Button>
    </div>
  );
};

export default TrackCard;
