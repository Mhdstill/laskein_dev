import Minimize from '@mui/icons-material/Minimize';
import classNames from 'classnames';
import React from 'react';

type SidebarItemProps = {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function SidebarItem({
  title,
  icon,
  badge,
  isActive,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      className={classNames(
        'w-full flex gap-4 text-[12px] py-2 px-5 items-center hover:bg-[#4a7677] hover:cursor-pointer',
        isActive ? 'bg-[#048285]' : ''
      )}
      onClick={onClick}
    >
      {icon ? (
        <p className="text-white">{icon}</p>
      ) : (
        <Minimize className="text-white" />
      )}
      <p className="text-white font-semibold leading-5">
        {title ? title : 'Title item'}
      </p>
      {badge && (
        <div className="py-[5px] px-[8.5px] bg-white leading-4 font-extrabold text-red-500 rounded-full">
          4
        </div>
      )}
    </div>
  );
}
