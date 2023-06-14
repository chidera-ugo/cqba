import { Dropdown } from 'components/common/Dropdown';
import { PropsWithChildren, useState } from 'react';

interface Props {
  id: string;
  options: { title: string; icon: JSX.Element }[];
}

export const TableAction = ({
  id,
  children,
  options,
}: PropsWithChildren<Props>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='relative ml-auto flex w-full justify-end' id={id}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className='my-auto mr-2 p-2'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13ZM5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15Z'
            fill='#6C737B'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
            fill='#6C737B'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13ZM19 15C20.6569 15 22 13.6569 22 12C22 10.3431 20.6569 9 19 9C17.3431 9 16 10.3431 16 12C16 13.6569 17.3431 15 19 15Z'
            fill='#6C737B'
          />
        </svg>
      </button>

      <Dropdown
        {...{
          wrapperId: id,
          show: showDropdown,
          dismiss() {
            setShowDropdown(false);
          },
        }}
        className='-mt-[6px] mr-3 min-w-[200px] bg-white p-2'
      >
        {options.map(({ title, icon }) => {
          return (
            <button
              disabled
              key={title}
              className='action-button hover:text-red-500 disabled:text-neutral-400'
            >
              <span className='my-auto mr-2'>{icon}</span>
              <span className='my-auto'>{title}</span>
            </button>
          );
        })}

        {children}
      </Dropdown>
    </div>
  );
};
