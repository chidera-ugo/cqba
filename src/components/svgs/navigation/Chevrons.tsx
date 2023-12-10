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
        fill='currentColor'
      />
    </svg>
  );
};

export const ChevronRight = () => {
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
        d='M5.04659 10.3389C4.84562 10.1299 4.85214 9.79753 5.06114 9.59656L7.81757 7L5.06114 4.40344C4.85214 4.20247 4.84562 3.87012 5.04659 3.66112C5.24755 3.45211 5.5799 3.4456 5.78891 3.64656L8.93891 6.62156C9.04185 6.72054 9.10002 6.85719 9.10002 7C9.10002 7.14281 9.04185 7.27945 8.93891 7.37844L5.78891 10.3534C5.5799 10.5544 5.24755 10.5479 5.04659 10.3389Z'
        fill='#676E76'
      />
    </svg>
  );
};

export const RightChevron = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.20938 14.7698C6.92228 14.4713 6.93159 13.9965 7.23017 13.7094L11.1679 10L7.23017 6.29062C6.93159 6.00353 6.92228 5.52875 7.20938 5.23017C7.49647 4.93159 7.97125 4.92228 8.26983 5.20937L12.7698 9.45937C12.9169 9.60078 13 9.79599 13 10C13 10.204 12.9169 10.3992 12.7698 10.5406L8.26983 14.7906C7.97125 15.0777 7.49647 15.0684 7.20938 14.7698Z'
        fill='currentColor'
      />
    </svg>
  );
};
