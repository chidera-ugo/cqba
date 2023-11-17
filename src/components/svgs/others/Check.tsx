export const Check = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.75 11.9999L10.58 14.8299L16.25 9.16992'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const SmallCheck = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='#1A44ED'
      className='h-4 w-4'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 12.75l6 6 9-13.5'
      />
    </svg>
  );
};

export const SolidCheck = ({ className }: { className?: string }) => {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.5 2.5C6.99 2.5 2.5 6.99 2.5 12.5C2.5 18.01 6.99 22.5 12.5 22.5C18.01 22.5 22.5 18.01 22.5 12.5C22.5 6.99 18.01 2.5 12.5 2.5ZM17.28 10.2L11.61 15.87C11.47 16.01 11.28 16.09 11.08 16.09C10.88 16.09 10.69 16.01 10.55 15.87L7.72 13.04C7.43 12.75 7.43 12.27 7.72 11.98C8.01 11.69 8.49 11.69 8.78 11.98L11.08 14.28L16.22 9.14C16.51 8.85 16.99 8.85 17.28 9.14C17.57 9.43 17.57 9.9 17.28 10.2Z'
        fill='currentColor'
      />
    </svg>
  );
};
