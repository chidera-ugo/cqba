export const Calendar = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.66663 1.66675V4.16675'
        stroke='#667085'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.3334 1.66675V4.16675'
        stroke='#667085'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.91663 7.57495H17.0833'
        stroke='#667085'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.5 7.08341V14.1667C17.5 16.6667 16.25 18.3334 13.3333 18.3334H6.66667C3.75 18.3334 2.5 16.6667 2.5 14.1667V7.08341C2.5 4.58341 3.75 2.91675 6.66667 2.91675H13.3333C16.25 2.91675 17.5 4.58341 17.5 7.08341Z'
        stroke='#667085'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.079 11.4167H13.0864'
        stroke='#667085'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.079 13.9167H13.0864'
        stroke='#667085'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.9962 11.4167H10.0037'
        stroke='#667085'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.9962 13.9167H10.0037'
        stroke='#667085'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.91197 11.4167H6.91945'
        stroke='#667085'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.91197 13.9167H6.91945'
        stroke='#667085'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

type IconProps = JSX.IntrinsicElements['div'];

// Icons
export const FirstPreviousButtonIcon = ({ className }: IconProps) => {
  return (
    <div className={`calendar-navigation-button ${className ?? ''}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='mx-auto h-4 w-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 19l-7-7 7-7'
        />
        4{' '}
      </svg>
    </div>
  );
};

export const FirstNextButtonIcon = ({ className }: IconProps) => {
  return (
    <div className={`calendar-navigation-button ${className ?? ''}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='mx-auto h-4 w-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
      </svg>
    </div>
  );
};
