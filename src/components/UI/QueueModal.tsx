import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../utils/appStore";
import { removeFromQueue, clearQueue } from "../../store/queueSlice";
import { useSpotifyPlayer } from "../../hooks/useSpotifySDK";
import Button from "./Button";
import { FaTrash, FaTimes } from "react-icons/fa";

interface QueueModalProps {
  onClose: () => void;
}

const QueueModal: React.FC<QueueModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const queueItems = useSelector((state: RootState) => state.queue.items);
  const { play } = useSpotifyPlayer();

  const handleRemoveTrack = (trackId: string) => {
    dispatch(removeFromQueue(trackId));
  };

  const handleClearQueue = () => {
    dispatch(clearQueue());
  };

  const handlePlayTrack = (track: any) => {
    play(track);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-bg-surface rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Queue ({queueItems.length} songs)</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {queueItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="text-xl mb-2">Queue is empty</p>
              <p className="text-sm">Add some tracks to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {queueItems.map((track, index) => (
                <div
                  key={`${track.id}-${index}`}
                  className="flex items-center gap-4 bg-bg-elevated p-3 rounded-lg hover:bg-bg-subtle transition-colors group"
                >
                  <div className="text-gray-500 font-medium w-8 text-center">
                    {index + 1}
                  </div>
                  <img
                    src={track.album.images[2]?.url || track.album.images[0]?.url}
                    alt={track.album.name}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{track.name}</div>
                    <div className="text-sm text-gray-400 truncate">
                      {track.artists.map(a => a.name).join(', ')}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {(track.duration_ms / 60000).toFixed(2)} mins
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlayTrack(track)}
                    >
                      Play
                    </Button>
                    <button
                      onClick={() => handleRemoveTrack(track.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {queueItems.length > 0 && (
          <div className="p-6 border-t border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Total duration: {(queueItems.reduce((acc, track) => acc + track.duration_ms, 0) / 60000).toFixed(2)} mins
            </div>
            <Button variant="ghost" size="md" onClick={handleClearQueue}>
              Clear Queue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueModal;
