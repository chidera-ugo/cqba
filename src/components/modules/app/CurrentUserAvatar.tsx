import Link from 'next/link';

export const CurrentUserAvatar = () => {
  return (
    <Link href={'/settings'} className={'my-auto'}>
      <svg
        width='36'
        height='36'
        viewBox='0 0 36 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          width='36'
          height='36'
          rx='18'
          fill='#0075FF'
          fillOpacity='0.13'
        />
        <path
          d='M18 17C20.2091 17 22 15.2091 22 13C22 10.7909 20.2091 9 18 9C15.7909 9 14 10.7909 14 13C14 15.2091 15.7909 17 18 17Z'
          fill='#1A44ED'
        />
        <path
          d='M11.3057 24C9.64905 26.6701 15.1327 28 18 28C20.8673 28 26.3509 26.6701 24.6943 24C23.4486 21.9921 20.9288 20 18 20C15.0712 20 12.5514 21.9921 11.3057 24Z'
          fill='#1A44ED'
        />
      </svg>
    </Link>
  );
};