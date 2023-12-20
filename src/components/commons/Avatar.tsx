import clsx from 'clsx';
import { UserIconMd } from 'components/svgs/UserIcon';
import Image from 'next/image';

interface Props {
  initials?: string;
  avatar?: string;
  getBackgroundColor?: (char: string) => string;
  clickable?: boolean;
  size?: number;
  className?: string;
}

export const Avatar = ({
  avatar,
  clickable,
  initials,
  getBackgroundColor,
  size = 40,
  className,
}: Props) => {
  const color = getBackgroundColor
    ? getBackgroundColor(initials?.charAt(0) ?? 'R')
    : '#989898';

  return (
    <div className={'my-auto flex-shrink-0'}>
      {!avatar ? (
        <>
          {!getBackgroundColor ? (
            <UserIconMd size={size} />
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
              {initials ? initials?.toUpperCase() : '-'}
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
              'my-auto h-full w-full rounded-full bg-neutral-300 object-cover object-center'
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
