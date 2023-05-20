import { PaginationDetails } from 'types/core/Table';
import {
  Dispatch,
  useRef,
  useState,
  SetStateAction,
  PropsWithChildren,
} from 'react';
import { PaginationState } from '@tanstack/react-table';

type Props = PaginationDetails & {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  fetching?: boolean;
};

export function Pagination({
  number,
  first,
  last,
  totalPages,
  totalElements,
  size,
  setPagination,
  pagination,
  fetching,
  children,
}: PropsWithChildren<Props>) {
  const buttonsDisabled = typeof number === 'undefined' || !totalPages;
  const debounceRef = useRef<any>(null);
  const [page, setPage] = useState(pagination.pageIndex);

  const goto = (value: number, debounce?: boolean) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPage(value);
    if (!debounce) {
      setPagination((prev: any) => ({
        ...prev,
        pageIndex: value,
      }));

      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPagination((prev: any) => ({
        ...prev,
        pageIndex: value,
      }));
    }, 500);
  };

  const handleChange = (_value: string) => {
    const value = Number(_value);
    if (isNaN(value) || !totalPages || !setPagination) return;

    if (value > totalPages) {
      goto(totalPages - 1, true);
    } else if (value < 1) {
      goto(0, true);
    } else {
      goto(value - 1, true);
    }
  };

  return (
    <div className='x-between w-full py-3 pr-6 text-neutral-400'>
      <div className='flex gap-5 align-middle'>
        <div className='my-auto flex gap-1 align-middle text-sm font-semibold uppercase'>
          <div>Showing </div>
          <>
            <span>{size ? ((number ?? 0) + 1) * size - size + 1 : 0}</span>
            <span> - </span>
            <span>
              {Math.min(
                Math.max(0, (size ?? 0) * ((number ?? 0) + 1)),
                totalElements ?? 0
              )}
            </span>

            <span> of </span>

            <span>{totalElements}</span>
          </>
        </div>
        {children}
      </div>

      <div className='flex gap-3 align-middle'>
        {fetching ? (
          <svg
            className='spinner my-auto h-6 w-6 text-primary-main'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        ) : null}

        <div className='flex gap-2 align-middle'>
          <span className='my-auto flex-shrink-0 text-sm font-semibold uppercase'>
            Rows per page
          </span>

          <select
            onChange={(e) => {
              setPagination((prev: any) => {
                return {
                  ...prev,
                  pageSize: Number(e.target.value),
                  pageIndex: 0,
                };
              });
            }}
            value={pagination.pageSize}
            className={`generic-input my-auto h-8 min-w-[100px] rounded-lg bg-transparent py-0 pl-2 text-sm`}
          >
            {[10, 25, 50, 100].map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>

        <div className='relative z-0 flex gap-2 align-middle font-bold'>
          <button
            className='pagination-button'
            onClick={() => goto(0)}
            disabled={first || buttonsDisabled}
          >
            DoubleLeft
          </button>
          <button
            className='pagination-button'
            onClick={() => goto((number ?? 0) - 1)}
            disabled={first || buttonsDisabled}
          >
            Left
          </button>

          <span className='flex items-center px-2 text-sm'>
            <input
              className='h-8 w-12 appearance-none rounded-lg border-2 border-neutral-200 px-2 font-semibold text-neutral-800'
              value={page + 1}
              onChange={(e) => handleChange(e.target.value)}
            />
            <span className='pl-2 pr-4'> / </span>
            <span>{totalPages}</span>
          </span>

          <button
            className='pagination-button'
            onClick={() => goto((number ?? 0) + 1)}
            disabled={last || buttonsDisabled}
          >
            Right
          </button>

          <button
            className='pagination-button'
            onClick={() => goto((totalPages ?? 0) - 1)}
            disabled={last || buttonsDisabled}
          >
            DoubleRight
          </button>
        </div>
      </div>
    </div>
  );
}
