import { useState, useEffect } from "react";

const useDetectOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Add window event listeners, attach it only once
  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleOnline = () => {
      setIsOnline(true);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Cleanup function
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return isOnline;
};

export default useDetectOnlineStatus;
