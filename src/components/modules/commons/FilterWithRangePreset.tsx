import { UseUrlManagedState } from '@/client_api/hooks/useUrlManagedState';
import { Dropdown } from '@/components/common/Dropdown';
import { AppErrorBoundary } from '@/components/core/ErrorBoundary';
import { Adjusters } from '@/components/svgs/forms/Adjusters';
import { BoxCancel } from '@/components/svgs/navigation/Menu';
import { getDateRange } from '@/utils/getters/getDateRange';
import { DatePicker } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export type SelectFilterItem = {
  label: string;
  id: string;
  options: (string | { label: string; value: string })[];
};

interface Props {
  className?: string;
  selectFilters?: SelectFilterItem[];
  hideDateRange?: boolean;
}

export const FilterWithRangePreset = ({
  className,
  setRange,
  setFilters,
  range,
  filters,
  selectFilters,
  hideDateRange,
}: Props & Omit<UseUrlManagedState, 'pagination' | 'setPagination'>) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasGeneratedExtraDefaultFilters, setHasGeneratedExtraDefaultFilters] =
    useState(false);

  const id = 'dateRangeFilter';

  const dateRangePresets = [
    {
      name: 'Today',
      value: 0,
    },
    {
      name: '7 days',
      value: 7,
      isDefault: true,
    },
    { name: '30 days', value: 30 },
    {
      name: '1 year',
      value: 365,
    },
  ];

  const defaultRangePreset = dateRangePresets.find(
    ({ isDefault }) => isDefault,
  );

  const [dropdownFilters, setDropdownFilters] = useState<Record<string, any>>({
    rangePreset: !!range.start ? null : defaultRangePreset,
    range: getDateRange({
      startDate: new Date(range?.start),
      endDate: new Date(range?.end),
    }),
  });

  useEffect(() => {
    if (
      !filters ||
      hasGeneratedExtraDefaultFilters ||
      !Object.keys(filters).length
    )
      return;

    setHasGeneratedExtraDefaultFilters(true);

    setDropdownFilters((prev) => ({
      ...prev,
      ...getExtraDefaultDropdownFilters(),
    }));
  }, [filters, hasGeneratedExtraDefaultFilters]);

  function dismiss() {
    setShowDropdown(false);
  }

  function clear() {
    const range = getDateRange({ days: defaultRangePreset?.value });

    const newFilters: Record<string, any> = {};

    if (selectFilters?.length) {
      for (const { id } of selectFilters) {
        newFilters[id] = null;
      }
    }

    setRange(range);
    newFilters['range'] = { start: range.start, end: range.end };

    setFilters((prev) => {
      return {
        ...prev!,
        ...newFilters,
      };
    });

    setDropdownFilters({
      rangePreset: defaultRangePreset,
      ...newFilters,
    });

    dismiss();
  }

  function apply() {
    const range = dropdownFilters.range
      ? dropdownFilters.range
      : getDateRange({ days: dropdownFilters.rangePreset.value });

    const newFilters: Record<string, any> = {};

    if (selectFilters?.length) {
      for (const { id } of selectFilters) {
        if (!!dropdownFilters[id]) {
          newFilters[id] = dropdownFilters[id];
        } else {
          newFilters[id] = null;
        }
      }
    }

    setRange(range);
    newFilters['range'] = { start: range.start, end: range.end };

    setFilters((prev) => {
      return {
        ...prev,
        ...newFilters,
      };
    });

    dismiss();
  }

  function getExtraDefaultDropdownFilters() {
    const defaultFilters: Record<string, any> = {};

    if (selectFilters) {
      for (const filter of selectFilters) {
        const val = filters?.[filter.id];

        if (val) defaultFilters[filter.id] = val;
      }
    }

    return defaultFilters;
  }

  return (
    <div id={id} className={clsx('relative my-auto flex-shrink-0', className)}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        type='button'
        className={clsx(
          'x-between z-50 h-8 w-full rounded-md border border-neutral-300 hover:border-primary-main transition-colors bg-white px-3',
          showDropdown && 'active-input',
        )}
      >
        <div className='my-auto mr-2'>
          <Adjusters />
        </div>

        <div className='my-auto text-sm font-medium'>Filter</div>
      </button>

      <AppErrorBoundary>
        <Dropdown
          disableCloseOnClickOutside
          show={showDropdown}
          className={clsx('right-0 bg-white min-w-max 640:left-0 p-4')}
          dismiss={dismiss}
          wrapperId={id}
          style={{
            minWidth: 300,
          }}
        >
          <div className='x-between'>
            <div></div>
            <button
              onClick={dismiss}
              type={'button'}
              className='y-center transition-colors text-neutral-380 hover:text-red-500'
            >
              <BoxCancel />
            </button>
          </div>

          {!hideDateRange && (
            <>
              <div className='label'>Date Range</div>

              <div className='flex gap-2'>
                {dateRangePresets.map(({ name, value }) => {
                  const isActive = name === dropdownFilters?.rangePreset?.name;

                  return (
                    <button
                      key={name}
                      type={'button'}
                      className={clsx(
                        'py-1 px-2 border rounded-md flex-shrink-0 text-sm',
                        isActive
                          ? 'border-primary-main text-primary-main'
                          : 'text-neutral-380 border-neutral-370',
                      )}
                      onClick={() => {
                        setDropdownFilters((prev) => ({
                          ...prev,
                          rangePreset: {
                            name,
                            value,
                          },
                          range: getDateRange({ days: value }),
                        }));
                      }}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>

              <div className='label mt-5'>Custom Date Range</div>

              <DatePicker.RangePicker
                className={'h-11 border-neutral-370'}
                value={[
                  dropdownFilters?.range?.dayjsStart,
                  dropdownFilters?.range?.dayjsEnd,
                ]}
                disabledDate={(d) =>
                  !d ||
                  d.isAfter(dayjs()) ||
                  d.isBefore(dayjs().subtract(5, 'years'))
                }
                onChange={(values) => {
                  if (!values || !values[0] || !values[1]) return;

                  setDropdownFilters((prev) => ({
                    ...prev,
                    range: getDateRange({
                      startDate: values[0]!.toDate(),
                      endDate: values[1]!.toDate(),
                    }),
                    rangePreset: null,
                  }));
                }}
              />
            </>
          )}

          {selectFilters?.map(({ id, label, options }, i) => {
            const value = dropdownFilters[id];

            return (
              <div key={id}>
                <div
                  className={clsx(
                    i > 0 || !hideDateRange ? 'mt-5' : '',
                    'label',
                  )}
                >
                  {label}
                </div>

                <select
                  onChange={(e) => {
                    setDropdownFilters((prev) => ({
                      ...prev,
                      [id]: e.target.value,
                    }));
                  }}
                  value={!!value ? value : ''}
                  className={clsx('w-full bg-white border-neutral-370')}
                >
                  <option value={''}></option>
                  {[...options]?.map((option) => {
                    if (typeof option === 'string')
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );

                    const { label, value } = option;

                    return (
                      <option key={label} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}

          <div className='x-between mt-5'>
            <div></div>

            <div className='flex gap-2'>
              <button
                onClick={clear}
                type={'button'}
                className='secondary-button border border-neutral-300 bg-white rounded-md h-8 px-3 text-sm'
              >
                Clear
              </button>
              <button
                type={'button'}
                onClick={apply}
                className='primary-button h-8 rounded-md text-sm px-3'
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Dropdown>
      </AppErrorBoundary>
    </div>
  );
};
