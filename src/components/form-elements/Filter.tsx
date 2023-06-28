import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { Adjusters } from 'components/svgs/forms/Adjusters';
import { MiniChevronDown } from 'components/svgs/navigation/Chevrons';
import { SolidCheck } from 'components/svgs/others/Check';
import { Dispatch, SetStateAction, useState } from 'react';
import { handleSort } from 'utils/handlers/handleSort';

interface Props<T> {
  id: string;
  className?: string;
  filters: Record<string, any>;
  setFilters: Dispatch<SetStateAction<Record<string, any>>>;
  options: T[];
  dropdownClassName?: string;
  withChevron?: boolean;
  filterKey: string;
  icon?: JSX.Element;
  secondaryAction?: (option: T) => void;
}

export const Filter = <T extends Record<string, any>>({
  id,
  icon,
  filterKey,
  className,
  withChevron,
  options,
  filters,
  dropdownClassName,
  setFilters,
  secondaryAction,
}: Props<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div id={id} className={clsx('relative my-auto flex-shrink-0', className)}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className='x-between z-50 w-full bg-white'
      >
        {!withChevron && (
          <div className='my-auto mr-2'>{icon ?? <Adjusters />}</div>
        )}

        <div className='my-auto text-sm font-medium'>
          {filters[filterKey]?.['name']}
        </div>

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
          'mt-2 min-w-[120px] bg-white p-2',
          dropdownClassName ?? 'right-0'
        )}
        dismiss={() => setShowDropdown(false)}
        wrapperId={id}
      >
        <div>
          {handleSort({ data: options, sortBy: 'name' }).map((option) => {
            const displayValue = (option as any)['name'];

            return (
              <button
                key={displayValue}
                onClick={() => {
                  if (secondaryAction) {
                    secondaryAction(option);
                  }

                  setFilters((prev) => ({
                    ...prev,
                    [filterKey]: option,
                  }));
                  setShowDropdown(false);
                }}
                className='x-between w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium text-neutral-500 hover:bg-gray-100'
              >
                {displayValue}

                {filters[filterKey]?.name === displayValue && (
                  <div className='my-auto text-primary-main'>
                    <SolidCheck className={'h-4 w-4'} />
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
