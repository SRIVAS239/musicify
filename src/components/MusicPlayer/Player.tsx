import { usePlayer } from "../../hooks/storeHooks";
import { useSpotifyPlayer } from "../../hooks/useSpotifySDK";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

function Player() {
  const { currentTrack, isPlaying, progressMs, durationMs, volume } = usePlayer();
  const { pause, resume, seek, setVol } = useSpotifyPlayer();

  console.log('Player render - currentTrack:', currentTrack?.name || 'none');

  // Nothing playing — hide the bar entirely
  if (!currentTrack) return null;

  const albumArt = currentTrack.album.images[1]?.url ?? currentTrack.album.images[0]?.url;

  const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-gray-800 p-4 z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 items-center">
        {/* Left: track info */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={albumArt}
            alt=""
            className="w-12 h-12 rounded object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="font-medium truncate text-white">
              {currentTrack.name}
            </div>
            <div className="text-sm text-gray-400 truncate">
              {currentTrack.artists.map(a => a.name).join(', ')}
            </div>
          </div>
        </div>

        {/* Centre: play/pause button + progress bar */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => isPlaying ? pause() : resume()}
            className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
          </button>

          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-400 min-w-8 text-right">
              {formatDuration(progressMs)}
            </span>
            <input
              type="range"
              min={0}
              max={durationMs}
              step={1000}
              value={progressMs}
              onChange={e => seek(Number(e.target.value))}
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-400 min-w-8">
              {formatDuration(durationMs)}
            </span>
          </div>
        </div>

        {/* Right: volume */}
        <div className="flex items-center gap-2 justify-end">
          <FaVolumeUp className="text-gray-400" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={e => setVol(Number(e.target.value))}
            className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
