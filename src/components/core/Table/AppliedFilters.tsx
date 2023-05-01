import clsx from 'clsx';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';

type Props = {
  reset: () => void;
  filters?: any;
  mustHaveRange?: boolean;
  onFilterClick?: (filter: string) => void;
  className?: string;
};

export const AppliedFilters = ({
  filters,
  onFilterClick,
  className,
  reset,
  mustHaveRange,
}: Props) => {
  const _onlyRangeFilterPresent = () => {
    return (
      filters &&
      Object.keys(filters)[0] === 'range' &&
      Object.keys(filters).length === 1 &&
      mustHaveRange
    );
  };

  const onlyRangeFilterPresent = _onlyRangeFilterPresent();

  const getAppliedFilters = () => {
    const arr: { id: string; value: string }[] = [];

    for (const i in filters) {
      if (filters[i] === 'all users' || !filters[i]) continue;
      if (i === 'range') {
        arr.push({
          id: i,
          value: `${filters[i]}`,
        });
        continue;
      }
      if (i === 'amount') {
        arr.push({
          id: i,
          value: `amount >= ₦${formatAmount({
            value: Number(filters[i]),
            decimalPlaces: 2,
            kFormatter: true,
          })}`,
        });
        continue;
      }
      arr.push({
        id: i,
        value: `FILTER_KEY - ${filters[i]}`,
      });
    }

    return arr;
  };

  const appliedFilters = getAppliedFilters();

  return (
    <div className={clsx('my-auto flex h-full gap-2 align-middle', className)}>
      {appliedFilters?.length > 1 && !onlyRangeFilterPresent && (
        <button
          onClick={reset}
          className='secondary-button my-auto h-8 rounded-lg px-2 text-xs'
        >
          Clear Filters
        </button>
      )}

      {appliedFilters && (
        <div className='my-auto flex gap-2 align-middle'>
          {appliedFilters.map(({ id, value }) => {
            return (
              <div
                key={id}
                onClick={
                  id === 'range'
                    ? undefined
                    : () => onFilterClick && onFilterClick(id)
                }
                className={clsx(
                  'purple-pill text-xs uppercase',
                  onFilterClick &&
                    id !== 'range' &&
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
