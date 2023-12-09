import clsx from 'clsx';
import { CurrentUserAvatar } from 'components/modules/app/CurrentUserAvatar';

interface Props {
  char?: string;
  avatar?: string;
  getBackgroundColor: (char: string) => string;
  clickable?: boolean;
  size?: number;
  className?: string;
  generic?: boolean;
}

export const Avatar = ({
  avatar,
  clickable,
  char,
  getBackgroundColor,
  size = 40,
  className,
  generic,
}: Props) => {
  const color = getBackgroundColor(char ?? 'R');

  return (
    <div className={'my-auto flex-shrink-0'}>
      {!avatar ? (
        <>
          {!generic ? (
            <CurrentUserAvatar size={size} />
          ) : (
            <div
              className={clsx(
                'y-center rounded-full text-center text-sm font-semibold text-black',
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
          )}
        </>
      ) : (
        <img
          style={{
            width: size,
            height: size,
          }}
          src={avatar}
          onClick={() => clickable && window.open(avatar, '_blank')}
          className={clsx(
            'my-auto rounded-full object-cover',
            clickable && 'cursor-pointer',
            className
          )}
          alt='user'
        />
      )}
    </div>
  );
};
