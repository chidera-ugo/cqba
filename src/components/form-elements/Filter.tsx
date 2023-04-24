import { Dropdown } from 'components/common/Dropdown';
import { Adjusters } from 'components/svgs/forms/Adjusters';
import { useState } from 'react';

interface Props {
  id: string;
  options: { name: string; value: any }[];
  onChange: (selection: Props['options'][0]) => void;
}

export const Filter = ({ id, options, onChange }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div id={id} className='relative'>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className='flex rounded-full border border-neutral-400 py-2 px-3'
      >
        <div className='my-auto mr-2'>
          <Adjusters />
        </div>
        <div className='text-sm font-semibold'>Filter</div>
      </button>

      <Dropdown
        show={showDropdown}
        className='right-0 min-w-[200px] bg-white p-2'
        close={() => setShowDropdown(false)}
        wrapperId={id}
      >
        <div>
          {options.map((option) => {
            return (
              <button
                key={option.name}
                onClick={() => onChange(option)}
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
