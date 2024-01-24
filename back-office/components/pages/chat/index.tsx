import classNames from 'classnames';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ChatDetails from './ChatDetails';
import ChatItem from './ChatItem';

export default function ChatComponent() {
  const [showText, setShowText] = React.useState<boolean>(false);

  return (
    <div className={classNames('flex bg-white h-full')}>
      {/* chat list */}
      <div
        className={classNames(
          'p-2.5 lg:w-[291px] md:w-[291px] border-r border-r-gray-100 flex flex-col gap-2.5',
          showText ? 'sm:w-[291px]' : 'sm:w-auto'
        )}
      >
        {/* title */}
        <div className="flex h-[79px] w-full items-center justify-center border-b border-b-gray-100">
          <h5 className="text-h5 text-[#4B5E65]">Message</h5>
        </div>
        <Scrollbars autoHide>
          <div className="flex flex-col gap-2.5">
            <ChatItem
              isActive
              setShowText={() => setShowText(!showText)}
              showText={showText}
            />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
          </div>
        </Scrollbars>
      </div>

      {/* chat details */}
      <ChatDetails />
    </div>
  );
}
