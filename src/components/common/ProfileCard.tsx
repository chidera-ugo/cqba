interface Props {
  title: string;
  subTitle: string;
  avatar: string;
}

export const ProfileCard = ({ title, subTitle, avatar: _ }: Props) => {
  return (
    <div className='x-between relative z-[25] w-full'>
      <div className='flex'>
        <div className='y-center mr-2.5 h-12 w-12 rounded-full bg-neutral-200 text-center text-xl font-bold'>
          {title.charAt(0)}
        </div>

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
