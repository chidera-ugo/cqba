import clsx from 'clsx';

export const Search = ({ className }: JSX.IntrinsicElements['div']) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={clsx(className)}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='11.7666'
        cy='11.7666'
        r='8.98856'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.0183 18.4851L21.5423 22'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
