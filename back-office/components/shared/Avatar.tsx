import classNames from 'classnames';
import Image from 'next/image';

type AvatarProps = {
  text?: string;
  background?: string;
  src?: string;
};

export default function Avatar({ text, background, src }: AvatarProps) {
  return (
    <div
      className={classNames(
        'h-[48px] w-[48px] rounded-full flex',
        background ? `bg-[${background}]` : 'bg-[#376F70]',
        'text-body1 text-white items-center justify-center'
      )}
    >
      {src ? (
        <Image
          src={src}
          alt="avatar-img"
          className="w-[48px] h-[48px] rounded-full"
        />
      ) : text ? (
        <p>{text}</p>
      ) : (
        <p>AB</p>
      )}
    </div>
  );
}
