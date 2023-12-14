export const RadioOff = () => {
  return (
    <svg
      width='34'
      height='35'
      viewBox='0 0 34 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_ddd_5629_41443)'>
        <rect x='5' y='3.5' width='24' height='24' rx='12' fill='white' />
      </g>
      <defs>
        <filter
          id='filter0_ddd_5629_41443'
          x='0'
          y='0.5'
          width='34'
          height='34'
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
            result='effect1_dropShadow_5629_41443'
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
            result='effect2_dropShadow_5629_41443'
          />
          <feOffset />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.403922 0 0 0 0 0.431373 0 0 0 0 0.462745 0 0 0 0.16 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_5629_41443'
            result='effect2_dropShadow_5629_41443'
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
            in2='effect2_dropShadow_5629_41443'
            result='effect3_dropShadow_5629_41443'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect3_dropShadow_5629_41443'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export const RadioOn = () => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='0.5' width='24' height='24' rx='12' fill='#1A44ED' />
      <circle cx='12' cy='12.5' r='5' fill='white' />
    </svg>
  );
};
