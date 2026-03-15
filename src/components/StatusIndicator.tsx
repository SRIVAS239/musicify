import React from 'react';
import { StatusIndicatorProps } from '../types/components';

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    // Draw a circle with green color if online else red color
    <>
      <span
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: status === "online" ? "green" : "red",
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "5px",
        }}
      ></span>
      {status.toUpperCase()}
    </>
  );
};

export default StatusIndicator;
