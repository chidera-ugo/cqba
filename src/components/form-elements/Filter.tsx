import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { Adjusters } from 'components/svgs/forms/Adjusters';
import { useState } from 'react';

interface Props {
  id: string;
  options: { name: string; value: any }[];
  onChange: (selection: Props['options'][0]) => void;
  dropdownClassName?: string;
}

export const Filter = ({ id, options, dropdownClassName, onChange }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div id={id} className='relative'>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className='relative z-50 flex h-11 rounded-full border border-neutral-300 bg-white py-2 px-3'
      >
        <div className='my-auto mr-2'>
          <Adjusters />
        </div>
        <div className='my-auto text-sm font-semibold'>Filter</div>
      </button>

      <Dropdown
        show={showDropdown}
        className={clsx(
          'min-w-[200px] bg-white p-2',
          dropdownClassName ?? 'right-0 '
        )}
        close={() => setShowDropdown(false)}
        wrapperId={id}
      >
        <div>
          {options.map((option) => {
            return (
              <button
                key={option.name}
                onClick={() => {
                  onChange(option);
                  setShowDropdown(false);
                }}
                className='smooth w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium text-neutral-500 transition-colors hover:bg-gray-100'
              >
                {option.name}
              </button>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
};
