import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  char?: string;
  avatar?: string;
  getBackgroundColor: (char: string) => string;
  clickable?: boolean;
  size?: number;
  className?: string;
}

export const Avatar = ({
  avatar,
  clickable,
  char = 'A',
  getBackgroundColor,
  size = 40,
  className,
}: Props) => {
  const color = getBackgroundColor(char);

  return (
    <>
      {!avatar ? (
        <div
          className={clsx(
            'y-center flex-shrink-0 rounded-full text-center text-sm font-semibold text-black',
            className
          )}
          style={{
            backgroundColor: `${color}30`,
            color,
            height: size,
            width: size,
          }}
        >
          {char ? char?.toUpperCase() : '-'}
        </div>
      ) : (
        <Image
          src={avatar}
          onClick={() => clickable && window.open(avatar, '_blank')}
          className={clsx(
            'my-auto rounded-full object-cover',
            clickable && 'cursor-pointer',
            className
          )}
          style={{
            height: size,
            width: size,
          }}
          alt='user'
        />
      )}
    </>
  );
};
