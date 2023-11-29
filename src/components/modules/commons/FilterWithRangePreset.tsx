import { DatePicker } from 'antd';
import clsx from 'clsx';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { Funnel } from 'components/svgs/forms/Funnel';
import dayjs from 'dayjs';
import { UseUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useEffect, useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

export type SelectFilterItem = {
  label: string;
  id: string;
  options: (string | { label: string; value: string })[];
};

interface Props {
  className?: string;
  selectFilters?: SelectFilterItem[];
  hideDateRange?: boolean;
  processing?: boolean;
}

export const FilterWithRangePreset = ({
  className,
  setRange,
  setFilters,
  range,
  filters,
  selectFilters,
  processing,
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
    { name: '3 months', value: 90 },
    {
      name: '1 year',
      value: 365,
    },
  ];

  const defaultRangePreset = dateRangePresets.find(
    ({ isDefault }) => isDefault
  );

  const [dropdownFilters, setDropdownFilters] = useState<Record<string, any>>({
    rangePreset: defaultRangePreset,
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
      <SubmitButton
        submitting={processing}
        onClick={() => {
          if (processing) return;
          setShowDropdown((prev) => !prev);
        }}
        type='button'
        className={clsx(
          'secondary-button z-50 flex h-11 w-[94px] px-4',
          showDropdown && 'active-input'
        )}
      >
        <div className='my-auto mr-2'>
          <Funnel />
        </div>

        <div className='my-auto text-sm font-medium'>Filter</div>
      </SubmitButton>

      <CentredModalWrapper
        show={showDropdown}
        closeModal={dismiss}
        title={'Filter'}
        className={'p-0'}
      >
        <div className={'h-full overflow-y-auto p-4'}>
          <AppErrorBoundary>
            {!hideDateRange && (
              <div className={'w-full'}>
                <div className='label'>Select Date Range</div>

                <div className='flex w-full gap-2'>
                  {dateRangePresets.map(({ name, value }) => {
                    const isActive =
                      name === dropdownFilters?.rangePreset?.name;

                    return (
                      <button
                        key={name}
                        type={'button'}
                        className={clsx(
                          'w-full min-w-fit rounded-md border py-1 px-2 text-sm',
                          isActive
                            ? 'border-primary-main text-primary-main'
                            : 'text-neutral-380 border-neutral-370'
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
                  rootClassName={'z-[2000]'}
                  className={'z-[2000] h-11 w-full'}
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
              </div>
            )}

            {selectFilters?.map(({ id, label, options }, i) => {
              const value = dropdownFilters[id];

              return (
                <div key={id}>
                  <div
                    className={clsx(
                      i > 0 || !hideDateRange ? 'mt-5' : '',
                      'label'
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
                    className={clsx(
                      'border-neutral-370 w-full',
                      !!value ? 'bg-white' : 'bg-neutral-100'
                    )}
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

            <div className='mt-5 flex'>
              <div className='flex gap-2'>
                <button
                  type={'button'}
                  onClick={apply}
                  className='primary-button px-5 text-sm'
                >
                  Apply Filters
                </button>

                <button
                  onClick={clear}
                  type={'button'}
                  className='secondary-button border border-neutral-300 bg-white px-5 text-sm'
                >
                  Clear
                </button>
              </div>
            </div>
          </AppErrorBoundary>
        </div>
      </CentredModalWrapper>
    </div>
  );
};
