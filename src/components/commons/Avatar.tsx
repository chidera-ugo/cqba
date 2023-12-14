import clsx from 'clsx';
import { CurrentUserAvatar } from 'components/modules/app/CurrentUserAvatar';
import Image from 'next/image';

interface Props {
  char?: string;
  avatar?: string;
  getBackgroundColor?: (char: string) => string;
  clickable?: boolean;
  size?: number;
  className?: string;
}

export const Avatar = ({
  avatar,
  clickable,
  char,
  getBackgroundColor,
  size = 40,
  className,
}: Props) => {
  const color = getBackgroundColor
    ? getBackgroundColor(char ?? 'R')
    : '#989898';

  return (
    <div className={'my-auto flex-shrink-0'}>
      {!avatar ? (
        <>
          {!getBackgroundColor ? (
            <CurrentUserAvatar size={size} />
          ) : (
            <div
              className={clsx(
                'y-center rounded-full text-center text-sm font-semibold text-white',
                className
              )}
              style={{
                backgroundColor: color,
                height: size,
                width: size,
              }}
            >
              {char ? char?.toUpperCase() : '-'}
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            width: size,
            height: size,
          }}
          onClick={() => clickable && window.open(avatar, '_blank')}
          className={clsx(
            'relative rounded-full',
            clickable && 'cursor-pointer',
            className
          )}
        >
          <Image
            className={
              'my-auto h-full w-full rounded-full object-cover object-center'
            }
            src={avatar}
            height={size}
            width={size}
            alt={'avatar'}
          />
        </div>
      )}
    </div>
  );
};
