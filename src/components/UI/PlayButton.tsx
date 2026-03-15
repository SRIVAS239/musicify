import React from "react";
import { FaPlay } from "react-icons/fa";
import { PlayButtonProps } from "../../types/components";

const PlayButton: React.FC<PlayButtonProps> = ({ size, type, onClick }) => {
  const sizeConfig = {
    container: {
      small: "w-6 h-6",
      medium: "w-8 h-8",
      large: "w-10 h-10",
    },
    icon: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  };

  const typeConfig = {
    primary: "text-white bg-purple-500 hover:bg-purple-600",
    secondary: "text-gray-700 bg-gray-300 hover:bg-gray-400",
    outline: "text-gray-700 border border-gray-300 hover:bg-gray-100",
  };

  const sizeClass = sizeConfig.container[size || 'medium'];
  const typeClass = typeConfig[type || 'primary'];

  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded-full ${typeClass} cursor-pointer`}
      onClick={onClick}
    >
      <FaPlay className={sizeConfig.icon[size || 'medium']} />
    </div>
  );
};

export default PlayButton;
