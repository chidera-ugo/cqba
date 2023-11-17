export const Hamburger = () => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.896 8.05469H19.896'
        stroke='#282828'
        strokeWidth='1.38462'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.896 16.0547H19.896'
        stroke='#282828'
        strokeWidth='1.38462'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Cancel = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className ?? 'h-6 w-6'}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export const BoxCancel = () => {
  return (
    <svg
      width='33'
      height='33'
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8.0293 24.998L24.9999 8.02748' stroke='black' />
      <path d='M8.0293 8L24.9999 24.9706' stroke='black' />
      <rect
        x='0.279297'
        y='0.25'
        width='32.4706'
        height='32.498'
        rx='4.75'
        stroke='#DADADA'
        strokeWidth='0.5'
      />
    </svg>
  );
};
