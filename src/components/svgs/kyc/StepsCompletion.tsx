export const CompletedStepCheck = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='10' fill='#1A44ED' />
      <path
        d='M5 10.5L9 14.5L15 5.5'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const NotProvidedUnchecked = () => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_ddd_5349_26982)'>
        <rect x='5' y='3' width='20' height='20' rx='10' fill='white' />
      </g>
      <defs>
        <filter
          id='filter0_ddd_5349_26982'
          x='0'
          y='0'
          width='30'
          height='30'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feGaussianBlur stdDeviation='0.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_5349_26982'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='1'
            operator='dilate'
            in='SourceAlpha'
            result='effect2_dropShadow_5349_26982'
          />
          <feOffset />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.403922 0 0 0 0 0.431373 0 0 0 0 0.462745 0 0 0 0.16 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_5349_26982'
            result='effect2_dropShadow_5349_26982'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='2.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.403922 0 0 0 0 0.431373 0 0 0 0 0.462745 0 0 0 0.08 0'
          />
          <feBlend
            mode='normal'
            in2='effect2_dropShadow_5349_26982'
            result='effect3_dropShadow_5349_26982'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect3_dropShadow_5349_26982'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
