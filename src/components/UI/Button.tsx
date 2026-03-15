import React from 'react';
import { ButtonProps } from '../../types/components';

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button
      className="w-full px-4 py-2 m1 border border-[1] border-gray-300 rounded-md text-emerald-800 hover:border-gray-200 hover:bg-gray-100"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
