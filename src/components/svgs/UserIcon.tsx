import clsx from 'clsx';

export const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={clsx(className ?? 'h-6 w-6')}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  );
};

export const UserIconLg = () => {
  return (
    <svg
      width='70'
      height='70'
      viewBox='0 0 70 70'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='1.69792'
        y='1.44792'
        width='66.6042'
        height='66.6042'
        rx='33.3021'
        fill='#E5E7EA'
      />
      <rect
        x='1.69792'
        y='1.44792'
        width='66.6042'
        height='66.6042'
        rx='33.3021'
        stroke='white'
        strokeWidth='2.89583'
      />
      <path
        d='M35 30.6957C38.3586 30.6957 41.0812 27.973 41.0812 24.6145C41.0812 21.2559 38.3586 18.5332 35 18.5332C31.6414 18.5332 28.9187 21.2559 28.9187 24.6145C28.9187 27.973 31.6414 30.6957 35 30.6957Z'
        fill='#1A44ED'
      />
      <path
        d='M21.7534 43.8587C21.3583 44.8885 21.7111 46.0427 22.5825 46.719C26.013 49.3814 30.3215 50.9665 35.0002 50.9665C39.6837 50.9665 43.9962 49.3782 47.4285 46.7108C48.2994 46.034 48.6515 44.8795 48.2557 43.8499C46.2099 38.5274 41.0492 34.7499 35.0062 34.7499C28.9599 34.7499 23.7969 38.5315 21.7534 43.8587Z'
        fill='#1A44ED'
      />
    </svg>
  );
};
