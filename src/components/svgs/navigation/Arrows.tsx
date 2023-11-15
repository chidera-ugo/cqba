import clsx from 'clsx';

export const Right = ({ className }: { className?: string }) => {
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
        d='M14.93 19.32C14.74 19.32 14.55 19.25 14.4 19.1C14.11 18.81 14.11 18.33 14.4 18.04L19.94 12.5L14.4 6.96C14.11 6.67 14.11 6.19 14.4 5.9C14.69 5.61 15.17 5.61 15.46 5.9L21.53 11.97C21.82 12.26 21.82 12.74 21.53 13.03L15.46 19.1C15.31 19.25 15.12 19.32 14.93 19.32Z'
        fill='currentColor'
      />
      <path
        d='M20.83 13.25H4C3.59 13.25 3.25 12.91 3.25 12.5C3.25 12.09 3.59 11.75 4 11.75H20.83C21.24 11.75 21.58 12.09 21.58 12.5C21.58 12.91 21.24 13.25 20.83 13.25Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const PointerLeft = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      className={'h-6 w-6'}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17 10C17 10.4142 16.6642 10.75 16.25 10.75L5.61208 10.75L9.76983 14.7094C10.0684 14.9965 10.0777 15.4713 9.79062 15.7698C9.50353 16.0684 9.02875 16.0777 8.73017 15.7906L3.23017 10.5406C3.08311 10.3992 3 10.204 3 10C3 9.79599 3.08311 9.60078 3.23017 9.45938L8.73017 4.20938C9.02875 3.92228 9.50353 3.93159 9.79062 4.23017C10.0777 4.52875 10.0684 5.00353 9.76983 5.29063L5.61208 9.25L16.25 9.25C16.6642 9.25 17 9.58579 17 10Z'
        fill='#1A44ED'
      />
    </svg>
  );
};

export const BackLine = ({ className }: { className?: string }) => {
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
        d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
      />
    </svg>
  );
};

export const Inbound = () => {
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
        d='M13.3023 4.6977C13.0387 4.4341 12.6113 4.4341 12.3477 4.6977L5.85 11.1954V6.075C5.85 5.70221 5.54779 5.4 5.175 5.4C4.80221 5.4 4.5 5.70221 4.5 6.075V12.825C4.5 13.1978 4.80221 13.5 5.175 13.5H11.925C12.2978 13.5 12.6 13.1978 12.6 12.825C12.6 12.4522 12.2978 12.15 11.925 12.15H6.80459L13.3023 5.6523C13.5659 5.38869 13.5659 4.96131 13.3023 4.6977Z'
        fill='white'
      />
    </svg>
  );
};

export const Outbound = () => {
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
        d='M4.6977 13.3023C4.96131 13.5659 5.38869 13.5659 5.6523 13.3023L12.15 6.80459V11.925C12.15 12.2978 12.4522 12.6 12.825 12.6C13.1978 12.6 13.5 12.2978 13.5 11.925V5.175C13.5 4.80221 13.1978 4.5 12.825 4.5H6.075C5.70221 4.5 5.4 4.80221 5.4 5.175C5.4 5.54779 5.70221 5.85 6.075 5.85H11.1954L4.6977 12.3477C4.4341 12.6113 4.4341 13.0387 4.6977 13.3023Z'
        fill='currentColor'
      />
    </svg>
  );
};
