import classNames from 'classnames';
import Avatar from '../../shared/Avatar';

type ChatItemProps = {
  isActive?: boolean;
  isHeader?: boolean;
  showText?: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowText?: (isShow?: boolean) => void;
};

export default function ChatItem({
  isActive,
  isHeader,
  showText,
  setShowText,
}: ChatItemProps) {
  return (
    <div
      className={classNames(
        'flex px-[10px] items-center w-full',
        isHeader
          ? 'py-[8px] pl-0 pr-[9px]'
          : ' py-[18px] gap-[10px] hover:bg-gray-100 hover:rounded-lg cursor-pointer ',
        isActive ? 'bg-gray-200 rounded-lg' : 'border-b border-b-gray-100'
      )}
    >
      <div
        className="flex gap-[10px] items-center cursor-pointer"
        onClick={() => setShowText && setShowText(!showText)}
      >
        <Avatar text="AB" background="#376F70" />
        <div
          className={classNames(
            'flex flex-col gap-[1px]',
            'lg:block md:block',
            showText ? 'sm:block' : 'sm:hidden'
          )}
        >
          <p className="text-subtitle1">Daniel Craig</p>
          <p className="text-subtitle2">online</p>
          {!isHeader && <p className="text-subtitle2">lorem ipsume delor...</p>}
        </div>
      </div>
      {!isHeader && (
        <div className="h-[20px] w-[20px] rounded-full bg-red-500 items-center justify-center flex">
          <p className="text-[12px] text-white">9</p>
        </div>
      )}
    </div>
  );
}
