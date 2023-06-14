import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { Adjusters } from 'components/svgs/forms/Adjusters';
import { MiniChevronDown } from 'components/svgs/navigation/Chevrons';
import { SolidCheck } from 'components/svgs/others/Check';
import { Dispatch, SetStateAction, useState } from 'react';

export type SelectOption = { name: string; value: any } | string;

interface Props {
  id: string;
  className?: string;
  filters: Record<string, any>;
  setFilters: Dispatch<SetStateAction<Record<string, any>>>;
  options: SelectOption[];
  dropdownClassName?: string;
  withChevron?: boolean;
  title?: string;
}

export const Filter = ({
  id,
  title,
  className,
  withChevron,
  options,
  filters,
  dropdownClassName,
  setFilters,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div id={id} className={clsx('relative', className)}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className='x-between z-50 h-11 w-full rounded-full border border-neutral-300 bg-white py-2 px-3'
      >
        {!withChevron && (
          <div className='my-auto mr-2'>
            <Adjusters />
          </div>
        )}

        <div className='my-auto text-sm font-semibold'>{title ?? 'Filter'}</div>

        {withChevron && (
          <span className='my-auto ml-1'>
            <div
              className={clsx(
                'duration-100',
                showDropdown ? 'rotate-180' : 'rotate-0'
              )}
            >
              <MiniChevronDown />
            </div>
          </span>
        )}
      </button>

      <Dropdown
        show={showDropdown}
        className={clsx(
          'min-w-[200px] bg-white p-2',
          dropdownClassName ?? 'right-0 '
        )}
        dismiss={() => setShowDropdown(false)}
        wrapperId={id}
      >
        <div>
          {options.map((option) => {
            const isString = typeof option === 'string';
            const displayValue = isString ? option : option.name;

            return (
              <button
                key={displayValue}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    [title ?? 'filter']: option,
                  }));
                  setShowDropdown(false);
                }}
                className='smooth x-between w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium text-neutral-500 transition-colors hover:bg-gray-100'
              >
                {displayValue}

                {filters[title ?? 'filter'] === displayValue && (
                  <div className='my-auto text-primary-main'>
                    <div className='h-4 w-4'>
                      <SolidCheck />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
};
