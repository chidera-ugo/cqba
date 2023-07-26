import clsx from 'clsx';

export const Exit = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.75 9V5.25C15.75 4.00736 14.7426 3 13.5 3L7.5 3C6.25736 3 5.25 4.00736 5.25 5.25L5.25 18.75C5.25 19.9926 6.25736 21 7.5 21H13.5C14.7426 21 15.75 19.9926 15.75 18.75V15M18.75 15L21.75 12M21.75 12L18.75 9M21.75 12L9 12'
        stroke='#F34141'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Clear = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      className='smooth x-center close-search mx-auto my-auto h-4 w-4'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.58928 4.41058C5.26384 4.08514 4.7362 4.08514 4.41076 4.41058C4.08533 4.73602 4.08533 5.26366 4.41076 5.58909L8.82152 9.99985L4.41079 14.4106C4.08535 14.736 4.08535 15.2637 4.41079 15.5891C4.73623 15.9145 5.26386 15.9145 5.5893 15.5891L10 11.1784L14.4108 15.5891C14.7362 15.9145 15.2638 15.9145 15.5893 15.5891C15.9147 15.2637 15.9147 14.736 15.5893 14.4106L11.1785 9.99985L15.5893 5.58909C15.9147 5.26366 15.9147 4.73602 15.5893 4.41058C15.2639 4.08515 14.7362 4.08515 14.4108 4.41058L10 8.82134L5.58928 4.41058Z'
        fill='currentColor'
        className='close-search'
      />
    </svg>
  );
};

export const CrossOutline = () => {
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
        stroke='#171717'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.16992 14.8299L14.8299 9.16992'
        stroke='#171717'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.8299 14.8299L9.16992 9.16992'
        stroke='#171717'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Cross = ({ className }: { className?: string }) => {
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
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export const CrossSubtract = () => {
  return (
    <svg
      width='37'
      height='38'
      viewBox='0 0 37 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.5 33.8002C26.6738 33.8002 33.2999 27.174 33.2999 19.0002C33.2999 10.8264 26.6738 4.2002 18.5 4.2002C10.3261 4.2002 3.69995 10.8264 3.69995 19.0002C3.69995 27.174 10.3261 33.8002 18.5 33.8002ZM15.3186 13.8566C14.7767 13.3147 13.8982 13.3147 13.3563 13.8566C12.8145 14.3984 12.8145 15.277 13.3563 15.8188L16.5377 19.0002L13.3563 22.1816C12.8145 22.7234 12.8145 23.602 13.3563 24.1438C13.8982 24.6857 14.7767 24.6857 15.3186 24.1438L18.5 20.9624L21.6813 24.1438C22.2232 24.6857 23.1017 24.6857 23.6436 24.1438C24.1854 23.602 24.1854 22.7234 23.6436 22.1816L20.4622 19.0002L23.6436 15.8188C24.1854 15.277 24.1854 14.3984 23.6436 13.8566C23.1017 13.3147 22.2232 13.3147 21.6813 13.8566L18.5 17.038L15.3186 13.8566Z'
        fill='currentColor'
      />
    </svg>
  );
};
