import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  char?: string;
  avatar?: string;
  getBackgroundColor: (char: string) => string;
  clickable?: boolean;
  size?: number;
}

export const Avatar = ({
  avatar,
  clickable,
  char,
  getBackgroundColor,
  size = 40,
}: Props) => {
  const color = getBackgroundColor(char ?? 'A');

  return (
    <>
      {!avatar ? (
        <div
          className='y-center flex-shrink-0 rounded-full text-center text-sm font-semibold text-black'
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
            clickable && 'cursor-pointer'
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
