import { LOGO_URL } from "../utils/constants";
import { useEffect } from "react";
import useDetectOnlineStatus from "../utils/useDetectOnlineStatus";
import { Link } from "react-router";
import Search from "./UI/Search";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import Button from "./UI/Button";
import { initiateLogin } from "../services/auth-service";

const Header: React.FC = () => {
  useEffect(() => {
    console.log("Header Mounted");
  }, []);

  const queueData = useSelector((store: RootState) => store.queue.items);
  console.log("Queue data in Header:", queueData);

  const onlineStatus = useDetectOnlineStatus();
  console.log("Online status in Header:", onlineStatus);

  return (
    <div className="header flex justify-between bg-bg-surface shadow-lg h-16 px-6 py-4">
      <div className="logo">
        <div className="logo-img">
          <img className="w-5 h-5" src={LOGO_URL} alt="logo" />
          {/* <StatusIndicator status={onlineStatus ? "online" : "offline"} /> */}
        </div>
      </div>
      <div>
        <Search />
      </div>
      <div className="nav-items">
        <ul className="flex items-center space-x-3">
          <li className="px-2">
            <Link to="/queue">Queue ({queueData.length} songs)</Link>
          </li>
          <li className="px-2">
            <Button variant="primary" size="md" onClick={initiateLogin}>
              Login with spotify
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
