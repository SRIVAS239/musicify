import React from "react";
import { useRouteError } from "react-router";

interface RouteError {
  error?: {
    message?: string;
  };
  message?: string;
  statusText?: string;
}

const Error: React.FC = () => {
  const error = useRouteError() as RouteError;
  console.log("Error Page", error);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <h3>
        {error?.error?.message ||
          error?.message ||
          error?.statusText ||
          "Unknown error occurred"}
      </h3>
    </div>
  );
};

export default Error;
