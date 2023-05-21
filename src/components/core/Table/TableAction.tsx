import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { CircleOptions } from 'components/svgs/others/Options';
import { useState } from 'react';

interface Props {
  dropdownId: string;
  options: { title: string; icon: JSX.Element }[];
  className?: string;
}

export const TableAction = ({ dropdownId, className, options }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div id={dropdownId} className={clsx('relative', className)}>
      <button onClick={() => setShowDropdown((prev) => !prev)}>
        <CircleOptions />
      </button>

      <Dropdown
        show={showDropdown}
        className={clsx('right-0 top-[20px] min-w-[200px] bg-white p-2')}
        close={() => setShowDropdown(false)}
        wrapperId={dropdownId}
      >
        {options.map(({ title, icon }) => {
          return (
            <button key={title} className='action-button'>
              <span className='my-auto mr-2 text-primary-main'>{icon}</span>
              <span className='my-auto font-medium'>{title}</span>
            </button>
          );
        })}
      </Dropdown>
    </div>
  );
};
