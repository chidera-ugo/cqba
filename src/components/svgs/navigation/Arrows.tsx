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
      width='12'
      height='20'
      viewBox='0 0 12 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='absolute'
      style={{
        top: 'calc(50% - 10px)',
        left: -8,
      }}
    >
      <path
        d='M0.374422 9.63971C0.170005 9.83641 0.170005 10.1636 0.374421 10.3603L8.15331 17.8455C8.47096 18.1512 9 17.9261 9 17.4852L9 2.51476C9 2.07393 8.47096 1.84881 8.15331 2.15447L0.374422 9.63971Z'
        fill='#0076FF'
      />
    </svg>
  );
};
