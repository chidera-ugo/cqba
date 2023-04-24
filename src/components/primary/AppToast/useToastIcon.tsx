export const useToastIcon = (type: string) => {
  switch (type) {
    case 'error':
      return (
        <svg
          width='21'
          height='23'
          viewBox='0 0 21 23'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.5 14.25C10.9832 14.25 11.375 13.8396 11.375 13.3333V8.75001C11.375 8.24375 10.9832 7.83334 10.5 7.83334C10.0168 7.83334 9.625 8.24375 9.625 8.75001V13.3333C9.625 13.8396 10.0168 14.25 10.5 14.25Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M17.2148 16.5461L11.2604 5.60027C10.9247 4.9832 10.0757 4.98321 9.73998 5.60027L3.78564 16.5462C3.45322 17.1572 3.87447 17.9167 4.54586 17.9167H16.4546C17.126 17.9167 17.5472 17.1572 17.2148 16.5461ZM12.7809 4.69254C11.7738 2.84134 9.22656 2.84134 8.21955 4.69254L2.26521 15.6384C1.26793 17.4717 2.53168 19.75 4.54586 19.75H16.4546C18.4688 19.75 19.7325 17.4717 18.7352 15.6384L12.7809 4.69254Z'
            fill='currentColor'
          />
          <path
            d='M11.375 16.0834C11.375 16.5896 10.9832 17 10.5 17C10.0168 17 9.625 16.5896 9.625 16.0834C9.625 15.5771 10.0168 15.1667 10.5 15.1667C10.9832 15.1667 11.375 15.5771 11.375 16.0834Z'
            fill='currentColor'
          />
        </svg>
      );
    case 'alert':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.29 3.85996L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9961 3.53002 21H20.47C20.8192 20.9961 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.85996C13.5318 3.56607 13.2807 3.32308 12.9812 3.15444C12.6817 2.98581 12.3438 2.89722 12 2.89722C11.6563 2.89722 11.3184 2.98581 11.0188 3.15444C10.7193 3.32308 10.4683 3.56607 10.29 3.85996V3.85996Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 9V13'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 17H12.01'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'info':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 21.9999C17.5228 21.9999 22 17.5227 22 11.9999C22 6.47703 17.5228 1.99988 12 1.99988C6.47715 1.99988 2 6.47703 2 11.9999C2 17.5227 6.47715 21.9999 12 21.9999Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 16V12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 7.99988H12.01'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    default:
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22 11.0801V12.0001C21.9988 14.1565 21.3005 16.2548 20.0093 17.9819C18.7182 19.7091 16.9033 20.9726 14.8354 21.584C12.7674 22.1954 10.5573 22.122 8.53447 21.3747C6.51168 20.6274 4.78465 19.2462 3.61096 17.4372C2.43727 15.6281 1.87979 13.4882 2.02168 11.3364C2.16356 9.18467 2.99721 7.13643 4.39828 5.49718C5.79935 3.85793 7.69279 2.71549 9.79619 2.24025C11.8996 1.76502 14.1003 1.98245 16.07 2.86011'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22 4.00012L12 14.0101L9 11.0101'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
  }
};
