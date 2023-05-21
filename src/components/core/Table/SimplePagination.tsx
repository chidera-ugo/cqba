import { PaginationDetails } from 'types/core/Table';
import { Dispatch, useState, SetStateAction } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { generatePlaceholderArray } from 'utils/helpers/generators/generatePlaceholderArray';
import clsx from 'clsx';
import { useAppContext } from 'context/AppContext';

type Props = PaginationDetails & {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  fetching?: boolean;
  className?: string;
};

export const SimplePagination = ({
  number,
  first,
  last,
  totalPages,
  setPagination,
  pagination,
  className,
}: Props) => {
  const buttonsDisabled = typeof number === 'undefined' || !totalPages;
  const [page, setPage] = useState(pagination.pageIndex);
  const { screenSize } = useAppContext().state;

  function goto(value: number) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const pageNumber = value > Number(totalPages) - 1 ? 0 : value;
    setPage(pageNumber);

    setPagination((prev: any) => ({
      ...prev,
      pageIndex: pageNumber,
    }));

    return;
  }

  const handleChange = (_value: string) => {
    const value = Number(_value);
    if (isNaN(value) || !totalPages || !setPagination) return;

    if (value > totalPages) {
      goto(totalPages - 1);
    } else if (value < 1) {
      goto(0);
    } else {
      goto(value - 1);
    }
  };

  function getFirstPages() {
    const length = screenSize?.['mobile'] ? 3 : 4;

    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(page + 1 + i);
    }

    return arr;
  }

  function getLastPages() {
    const length = screenSize?.['mobile'] ? 1 : 3;

    const arr = [];
    for (let i = length; i > 0; i--) {
      arr.push(Number(totalPages) - i + 1);
    }

    return arr;
  }

  function getPageNumbers() {
    if (!totalPages) return [];

    if (totalPages <= 7 && !screenSize?.['mobile']) {
      return generatePlaceholderArray(totalPages, true) as number[];
    } else {
      return [...getFirstPages(), null, ...getLastPages()];
    }
  }

  return (
    <div
      className={clsx(
        'x-between flex h-16 w-full grid-cols-12 py-3 text-neutral-400 640:grid',
        className ?? 'pr-3 640:pr-6'
      )}
    >
      <span className='y-center col-span-3'>
        <button
          className='pagination-button my-auto mr-auto flex h-full disabled:cursor-not-allowed 640:-ml-5 640:px-5'
          onClick={() => goto((page ?? 0) - 1)}
          disabled={first || buttonsDisabled}
        >
          <span className='my-auto'>
            <Arrow />
          </span>
          <span className='my-auto ml-2 hidden text-sm font-semibold 640:block'>
            Previous
          </span>
        </button>
      </span>

      <div className='y-center col-span-6'>
        <div className='x-center my-auto'>
          {getPageNumbers().map((pageNumber) => {
            if (!pageNumber)
              return (
                <button
                  key={'pagination-separator'}
                  className='mx-3 text-neutral-600'
                >
                  ...
                </button>
              );

            return (
              <button
                key={pageNumber}
                onClick={() => handleChange(String(pageNumber))}
                className={clsx(
                  'h-10 rounded-lg px-3',
                  page === Number(pageNumber) - 1 &&
                    'bg-primary-main font-medium text-white'
                )}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>

      <span className='y-center col-span-3'>
        <button
          className='pagination-button my-auto ml-auto flex h-full disabled:cursor-not-allowed 640:-mr-5 640:px-5'
          onClick={() => goto((page ?? 0) + 1)}
          disabled={last || buttonsDisabled}
        >
          <span className='my-auto mr-2 hidden text-sm font-semibold 640:block'>
            Next
          </span>
          <span className='my-auto rotate-180'>
            <Arrow />
          </span>
        </button>
      </span>
    </div>
  );
};

const Arrow = () => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.3 8.99961C15.3 9.3724 14.9978 9.67461 14.625 9.67461L5.05092 9.67461L8.7929 13.238C9.06162 13.4964 9.07 13.9237 8.81161 14.1925C8.55322 14.4612 8.12592 14.4696 7.8572 14.2112L2.9072 9.48617C2.77485 9.35891 2.70005 9.18322 2.70005 8.99961C2.70005 8.816 2.77485 8.64031 2.9072 8.51305L7.8572 3.78805C8.12592 3.52966 8.55323 3.53804 8.81161 3.80676C9.07 4.07548 9.06162 4.50279 8.7929 4.76117L5.05092 8.32461L14.625 8.32461C14.9978 8.32461 15.3 8.62682 15.3 8.99961Z'
        fill='#0076FF'
      />
    </svg>
  );
};
