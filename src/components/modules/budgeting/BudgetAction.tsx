import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import {
  Pause,
  CircleOptions,
  Lock,
} from 'components/svgs/budgeting/Budget_Icons';
import { useState } from 'react';

export const BudgetAction = ({ dropdownId }: { dropdownId: string }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const budgetOptions = [
    {
      title: 'Pause Budget',
      icon: <Pause />,
    },
    {
      title: 'Close Budget',
      icon: <Lock />,
    },
  ];

  return (
    <div id={dropdownId} className='relative h-min'>
      <button onClick={() => setShowDropdown((prev) => !prev)} className=''>
        <CircleOptions />
      </button>

      <Dropdown
        show={showDropdown}
        className={clsx('right-0 top-[20px] min-w-[200px] bg-white p-2')}
        close={() => setShowDropdown(false)}
        wrapperId={dropdownId}
      >
        {budgetOptions.map(({ title, icon }) => {
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
