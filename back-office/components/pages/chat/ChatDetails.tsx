import { Scrollbars } from 'react-custom-scrollbars-2';
import FileIcon from '../../icons/svg/FileIcon';
import PictureIcon from '../../icons/svg/PictureIcon';
import SendIcon from '../../icons/svg/SendIcon';
import IconButton from '../../shared/button/IconButton';
import ChatItem from './ChatItem';
import MessageItem from './MessageItem';

export default function ChatDetails() {
  return (
    <div className="p-[10px] flex flex-col flex-1 gap-2.5 h-full">
      {/* chat title */}
      <div className="flex w-full">
        <ChatItem isHeader />
      </div>
      <div className="flex flex-col h-[calc(100%_-_68px)]">
        {/* message wrapper */}
        <Scrollbars autoHide>
          <div className="flex flex-col gap-1">
            <MessageItem isFromSender />
            <MessageItem />
            <MessageItem />
            <MessageItem isFromSender />
            <MessageItem />
            <MessageItem isFromSender />
          </div>
        </Scrollbars>

        {/* input send */}
        <div className="h-[75px] flex py-1 gap-2.5 border-t border-t-gray-100 items-start">
          <input
            type="text"
            placeholder="Type your text here..."
            className="w-full border-none ring-0 outline-none focus:border-none focus:outline-0 focus:ring-0 p-2.5 text-subtitle2"
          />
          <div className="flex gap-5 items-center p-2.5">
            <IconButton>
              <FileIcon />
            </IconButton>
            <IconButton>
              <PictureIcon />
            </IconButton>
            <IconButton>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
