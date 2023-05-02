export const ChevronDown = ({ className }: { className?: string }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.25 6.875L10 13.125L3.75 6.875'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const MiniChevronDown = () => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.70715 6.48824C4.97587 6.22986 5.40318 6.23824 5.66156 6.50696L9 10.0509L12.3384 6.50696C12.5968 6.23824 13.0241 6.22986 13.2928 6.48824C13.5616 6.74663 13.5699 7.17393 13.3116 7.44265L9.48656 11.4927C9.3593 11.625 9.18361 11.6998 9 11.6998C8.81639 11.6998 8.6407 11.625 8.51344 11.4927L4.68844 7.44265C4.43005 7.17393 4.43843 6.74663 4.70715 6.48824Z'
        fill='#1A1D1F'
      />
    </svg>
  );
};
