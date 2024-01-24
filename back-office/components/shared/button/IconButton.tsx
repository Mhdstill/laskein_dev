import React from 'react';
import PictureIcon from '../../icons/svg/PictureIcon';

type IconButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#376F70] w-10 h-10 rounded-full flex items-center justify-center"
    >
      {children ? children : <PictureIcon />}
    </button>
  );
}
