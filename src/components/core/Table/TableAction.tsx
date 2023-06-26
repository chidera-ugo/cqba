import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { PropsWithChildren, useState } from 'react';

interface TableActionItem {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface Props {
  options: TableActionItem[];
  id: string;
  isLastRow: boolean;
}

export const TableAction = ({
  children,
  id,
  isLastRow,
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
          height='25'
          viewBox='0 0 24 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 7.25C11.5858 7.25 11.25 6.91421 11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5C12.75 6.91421 12.4142 7.25 12 7.25Z'
            stroke='#1A44ED'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 13.25C11.5858 13.25 11.25 12.9142 11.25 12.5C11.25 12.0858 11.5858 11.75 12 11.75C12.4142 11.75 12.75 12.0858 12.75 12.5C12.75 12.9142 12.4142 13.25 12 13.25Z'
            stroke='#1A44ED'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 19.25C11.5858 19.25 11.25 18.9142 11.25 18.5C11.25 18.0858 11.5858 17.75 12 17.75C12.4142 17.75 12.75 18.0858 12.75 18.5C12.75 18.9142 12.4142 19.25 12 19.25Z'
            stroke='#1A44ED'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
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
        className={clsx(
          'mr-9 min-w-[200px] bg-white p-2',
          isLastRow ? '-mb-4' : '-mt-8'
        )}
        anchorPosition={isLastRow ? 'top' : 'bottom'}
      >
        {options.map(({ title, icon, onClick }) => {
          return (
            <button
              key={title}
              onClick={onClick}
              className='action-button disabled:text-neutral-400'
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
