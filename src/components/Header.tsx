import { useEffect, useState } from "react";
import useDetectOnlineStatus from "../utils/useDetectOnlineStatus";
import Search from "./UI/Search";
import QueueModal from "./UI/QueueModal";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import Button from "./UI/Button";
import { initiateLogin } from "../services/auth-service";

const Header: React.FC = () => {
  const [showQueueModal, setShowQueueModal] = useState(false);
  
  useEffect(() => {
    console.log("Header Mounted");
  }, []);

  const queueData = useSelector((store: RootState) => store.queue.items);
  console.log("Queue data in Header:", queueData);

  const onlineStatus = useDetectOnlineStatus();
  console.log("Online status in Header:", onlineStatus);

  return (
    <>
      <div className="header flex justify-between bg-bg-surface shadow-lg h-16 px-6 py-4">
        <div className="logo">
          <div className="logo-text">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Musicify
            </h1>
            {/* <StatusIndicator status={onlineStatus ? "online" : "offline"} /> */}
          </div>
        </div>
        <div>
          <Search />
        </div>
        <div className="nav-items">
          <ul className="flex items-center space-x-3">
            <li className="px-2">
              <button 
                onClick={() => setShowQueueModal(true)}
                className="text-white hover:text-purple-400 transition-colors"
              >
                Queue ({queueData.length} songs)
              </button>
            </li>
            <li className="px-2">
              <Button variant="primary" size="md" onClick={initiateLogin}>
                Login with spotify
              </Button>
            </li>
          </ul>
        </div>
      </div>
      
      {showQueueModal && <QueueModal onClose={() => setShowQueueModal(false)} />}
    </>
  );
};

export default Header;
