import classNames from 'classnames';

type MessageItemProps = {
  text?: string;
  isFromSender?: boolean;
};

export default function MessageItem({ text, isFromSender }: MessageItemProps) {
  return (
    <div
      className={classNames(
        'py-2.5 flex w-full',
        isFromSender ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={classNames(
          'w-1/2 rounded-lg p-2.5',
          isFromSender
            ? 'bg-[#376F70] text-white'
            : 'border-[2px] border-[#376F70]'
        )}
      >
        <p className="text-subtitle2">
          {text
            ? text
            : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'}
        </p>
      </div>
    </div>
  );
}
