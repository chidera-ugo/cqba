export const Check = () => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.4821 8.85663C12.147 8.50415 12.5999 7.80497 12.5999 7.00002C12.5999 6.19507 12.147 5.4959 11.4821 5.14342C11.703 4.42404 11.5289 3.6094 10.9597 3.04021C10.3905 2.47102 9.57588 2.29688 8.8565 2.51778C8.50402 1.85291 7.80485 1.40002 6.9999 1.40002C6.19495 1.40002 5.49578 1.85292 5.1433 2.51779C4.42392 2.2969 3.60929 2.47105 3.04011 3.04023C2.47092 3.60942 2.29677 4.42405 2.51766 5.14342C1.85279 5.4959 1.3999 6.19508 1.3999 7.00002C1.3999 7.80498 1.85279 8.50414 2.51767 8.85663C2.29677 9.57601 2.47091 10.3906 3.0401 10.9598C3.60929 11.529 4.42392 11.7032 5.1433 11.4823C5.49579 12.1471 6.19495 12.6 6.9999 12.6C7.80486 12.6 8.50403 12.1471 8.85651 11.4823C9.57588 11.7031 10.3905 11.529 10.9597 10.9598C11.5289 10.3906 11.703 9.576 11.4821 8.85663ZM9.69949 5.73381C9.87003 5.49932 9.81819 5.17098 9.58369 5.00044C9.3492 4.8299 9.02086 4.88174 8.85032 5.11623L6.41169 8.46935L5.09613 7.15379C4.89111 6.94877 4.5587 6.94877 4.35367 7.15379C4.14865 7.35882 4.14865 7.69123 4.35367 7.89626L6.10367 9.64626C6.21224 9.75483 6.3629 9.81043 6.51597 9.79842C6.66904 9.78641 6.80918 9.70799 6.89949 9.58381L9.69949 5.73381Z'
        fill='#1A44ED'
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
