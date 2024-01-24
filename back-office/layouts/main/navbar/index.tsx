import React from 'react';

import Mail from '@mui/icons-material/Mail';
import Menu from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames';

import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { toggleSideBarleft } from '../../../services/redux/ui/uiSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { showSidebarLeft } = useAppSelector((state) => state.ui);

  const { user } = useAppSelector((state) => state.auth);

  const [rule, setRule] = React.useState<string>('');

  const [name, setName] = React.useState<string>('');

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 976 && showSidebarLeft) {
        dispatch(toggleSideBarleft());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, showSidebarLeft]);

  React.useEffect(() => {
    if (user?.isAdmin) {
      setRule('Administrateur');
    } else {
      setRule('Moderateur');
    }
  }, [user]);

  React.useEffect(() => {
    if (user?.firstName && user?.lastName) {
      setName(`${user?.firstName} ${user?.lastName}`);
      if (`${user?.firstName} ${user?.lastName}`.length > 20) {
        setName(`${user?.firstName} ${user?.lastName[0]}.`);
      }
    } else if (user?.firstName && !user?.lastName) {
      setName(user.firstName);
    } else if (!user?.firstName && user?.lastName) {
      setName(user.lastName);
    }
  }, [user]);

  const photoUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user?.photoUrl}`;

  return (
    <div
      className={classNames(
        'w-full h-[67px] bg-[#2F435E] flex items-center px-[10px] z-[3] absolute',
        'lg:justify-end md:justify-between sm:justify-between'
      )}
    >
      <div className="lg:hidden md:flex sm:flex items-center">
        <IconButton
          size="small"
          className="text-white w-[40px] h-[40px]"
          onClick={() => dispatch(toggleSideBarleft())}
        >
          <Menu />
        </IconButton>
        {showSidebarLeft && (
          <h5 className="leading-8 text-[23px] text-white py-[11.5px] px-[14px]">
            LasKein
          </h5>
        )}
      </div>

      <div className="flex gap-[10px] items-center px-[10px]">
        {/* mail */}
        <button
          className="relative h-[44px] w-[44px] flex items-center justify-center text-white"
          onClick={() => router.push('/email')}
        >
          <Mail />
          <div className="w-[9px] h-[9px] rounded-full bg-[#F44336] absolute right-[2px] top-[10px]"></div>
        </button>

        {/* separator */}
        <div className="w-[2px] h-[33px] bg-[rgba(0,0,0,0.12)]"></div>

        {/* username */}
        <div className="text-[14px] leading-[22px] flex flex-col gap-[1px]">
          <p className="text-white">{name}</p>
          <p className="text-[#ECECEC]">{rule}</p>
        </div>

        {/* avatar */}
        <Avatar alt={user?.firstName} src={photoUrl} />
      </div>
    </div>
  );
}
