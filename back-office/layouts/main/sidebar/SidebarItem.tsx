import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'services/redux/hooks';
import { toggleSideBarleft } from 'services/redux/ui/uiSlice';

type SidebarItemProps = {
  title: string;
  icon?: React.ReactNode;
  route?: string;
  routerPrefix?: string;
  onClick?: () => void;
};

export default function SidebarItem({
  title,
  icon,
  route,
  routerPrefix,
  onClick,
}: SidebarItemProps) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const routers = router.asPath.split('/');

  const [isActive, setIsActive] = React.useState<boolean>(false);

  useEffect(() => {
    if (route === router.asPath || routers.includes(routerPrefix!)) {
      setIsActive(true);
    }
  }, [routers, routerPrefix, route, router]);

  function navigateTo() {
    if (route) {
      router.push(`${route}`);
      if (window.innerWidth <= 976) {
        dispatch(toggleSideBarleft());
      }
    }
  }

  return (
    <button
      className={classNames(
        'flex gap-[16px] py-[13px] hover:cursor-pointer px-5 items-center hover:bg-[#344a68] w-full',
        isActive
          ? 'bg-[#376F70] border-l-[7px] border-l-[#ECECEC] px-[15px]'
          : ''
      )}
      onClick={route ? navigateTo : onClick}
    >
      {/* icon */}
      {icon ? icon : <p className="text-white">X</p>}

      {/* text */}
      <p className="text-[12px] font-semibold leading-[20px] text-white">
        {title ? title : 'Item'}
      </p>
    </button>
  );
}
