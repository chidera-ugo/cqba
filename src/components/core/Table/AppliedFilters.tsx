import clsx from 'clsx';
import { formatAmount } from 'utils/formatters/formatAmount';
import { DateRange } from 'utils/getters/getDateRange';

type Props = {
  reset: () => void;
  filters?: any;
  onFilterClick?: (filter: string) => void;
  className?: string;
  mustHaveRange?: boolean;
  onlyRangeFilterPresent?: boolean;
  tableFiltersKeyValuePairs?: Record<string, any>;
};

export const AppliedFilters = ({
  filters,
  mustHaveRange,
  onFilterClick,
  className,
  reset,
  onlyRangeFilterPresent,
  tableFiltersKeyValuePairs,
}: Props) => {
  function getAppliedFilters() {
    const arr: { id: string; value: string }[] = [];

    for (const i in filters) {
      if (!filters[i]) continue;

      if (i === 'dateRange') {
        const range = filters[i] as DateRange;

        arr.push({
          id: i,
          value: `${range.start?.replaceAll(
            '-',
            '/'
          )} - ${range.end?.replaceAll('-', '/')}`,
        });
        continue;
      }

      if (i === 'amount') {
        arr.push({
          id: i,
          value: `amount >= ${formatAmount({
            value: Number(filters[i]),
            decimalPlaces: 2,
            kFormatter: true,
          })}`,
        });
        continue;
      }

      arr.push({
        id: i,
        value: `${tableFiltersKeyValuePairs?.[i as any] ?? i} - ${
          filters[i]['name']
        }`,
      });
    }

    return arr;
  }

  const appliedFilters = getAppliedFilters();

  return (
    <div className={clsx('my-auto flex h-full gap-2 align-middle', className)}>
      {appliedFilters?.length > 1 &&
        !onlyRangeFilterPresent &&
        mustHaveRange && (
          <button
            onClick={reset}
            className='outline-button my-auto h-7 flex-shrink-0 rounded-lg border-neutral-300 px-2 text-xs'
          >
            Clear Filters
          </button>
        )}
      {appliedFilters && (
        <div className='my-auto flex flex-shrink-0 gap-2 align-middle'>
          {appliedFilters.map(({ id, value }) => {
            return (
              <div
                key={id}
                onClick={
                  id === 'dateRange'
                    ? undefined
                    : () => onFilterClick && onFilterClick(id)
                }
                className={clsx(
                  'blue-pill uppercase',
                  onFilterClick &&
                    id !== 'dateRange' &&
                    'hover:red-pill cursor-pointer'
                )}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
