import classNames from 'classnames';
import React from 'react';
import RequireAuth from '../../components/pages/auth/RequireAuth';
import Navbar from './navbar';
import SidebarLeft from './sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <RequireAuth>
      <div className="w-screen h-screen bg-gray-50 flex overflow-x-hidden overflow-y-hidden relative">
        <SidebarLeft />

        {/* body */}
        <div
          className={classNames(
            'h-full overflow-hidden',
            'lg:w-[calc(100%_-_230px)] md:w-full sm:w-full relative'
          )}
        >
          {/* navbar */}
          <Navbar />

          {/* body */}
          <div className="bg-gray-100 p-2.5 h-[calc(100%_-_67px)] w-full overflow-hidden z-[1] mt-[67px]">
            {children}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
