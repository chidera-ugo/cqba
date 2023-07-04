import { Avatar } from 'components/common/Avatar';

interface Props {
  title: string;
  subTitle: string;
  avatar?: string;
  getBackgroundColor: (char: string) => string;
}

export const ProfileCard = ({
  title,
  subTitle,
  getBackgroundColor,
  avatar,
}: Props) => {
  return (
    <div className='x-between relative z-[25] w-full'>
      <div className='flex gap-3'>
        <Avatar {...{ getBackgroundColor, avatar, char: title.charAt(0) }} />

        <div className='my-auto text-left'>
          <div className='text-base font-semibold text-neutral-1000 line-clamp-1'>
            {title}
          </div>
          <div className='text-xs text-neutral-600 line-clamp-1'>
            {subTitle}
          </div>
        </div>
      </div>
    </div>
  );
};
