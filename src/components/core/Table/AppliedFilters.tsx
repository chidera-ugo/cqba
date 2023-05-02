import clsx from 'clsx';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';

type Props = {
  reset: () => void;
  filters?: any;
  onFilterClick?: (filter: string) => void;
  className?: string;
};

export const AppliedFilters = ({
  filters,
  onFilterClick,
  className,
  reset,
}: Props) => {
  function getAppliedFilters() {
    const arr: { id: string; value: string }[] = [];

    for (const i in filters) {
      if (filters[i] === 'all users' || !filters[i]) continue;
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

      const value = filters[i];
      const val = typeof value === 'string' ? value : value['name'];

      arr.push({
        id: i,
        value: `${i} - ${val}`,
      });
    }

    return arr;
  }

  const appliedFilters = getAppliedFilters();

  return (
    <div className={clsx('my-auto flex h-full gap-2 align-middle', className)}>
      <button
        onClick={reset}
        className='outline-button my-auto h-7 flex-shrink-0 rounded-lg border-neutral-300 px-2 text-xs'
      >
        Clear Filters
      </button>

      {appliedFilters && (
        <div className='my-auto flex flex-shrink-0 gap-2 align-middle'>
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
                  'blue-pill uppercase',
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
