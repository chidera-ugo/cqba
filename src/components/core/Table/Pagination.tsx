import { useAppContext } from 'context/AppContext';
import { PaginationDetails } from 'types/Table';
import { Dispatch, useState, SetStateAction, useEffect } from 'react';
import { PaginationState } from '@tanstack/react-table';
import clsx from 'clsx';
import ReactPaginate from 'react-paginate';

type Props = PaginationDetails & {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  fetching?: boolean;
};

export const Pagination = ({
  hasNextPage,
  hasPrevPage,
  setPagination,
  pagination,
  fetching,
  totalPages,
  page: pageIndex,
}: Props) => {
  const pageNumber = (pageIndex ?? 0) - 1;

  const last = !hasNextPage;
  const first = !hasPrevPage;

  const disabled = typeof pageNumber === 'undefined' || !totalPages;

  const [page, setPage] = useState(pagination.pageIndex);

  useEffect(() => {
    setPage(pagination.pageIndex);
  }, [pagination.pageIndex]);

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

  function handleChange(_value: any) {
    const value = Number(_value);

    if (isNaN(value) || !totalPages || !setPagination) return;

    if (value > totalPages) {
      goto(totalPages - 1);
    } else if (value < 1) {
      goto(0);
    } else {
      goto(value - 1);
    }
  }

  if (screenSize?.mobile)
    return (
      <div className={'grid h-12 grid-cols-12'}>
        <div className='col-span-4'>
          <button
            className='pagination-button left-5 top-0 my-auto mr-auto flex h-full rounded-xl disabled:cursor-not-allowed 640:-ml-5 640:px-5'
            onClick={() => goto((page ?? 0) - 1)}
            disabled={first || disabled || fetching}
          >
            <span className='my-auto'>
              <Arrow />
            </span>
            <span className='my-auto ml-2 hidden text-sm font-semibold 640:block'>
              Previous
            </span>
          </button>
        </div>

        <p className={'col-span-4 my-auto text-center text-sm font-medium'}>
          Page {page + 1} of {totalPages}
        </p>

        <div className='col-span-4'>
          <button
            className='pagination-button top-0 my-auto ml-auto flex h-full rounded-xl disabled:cursor-not-allowed 640:-mr-5 640:px-5'
            onClick={() => goto((page ?? 0) + 1)}
            disabled={last || disabled || fetching}
          >
            <span className='my-auto mr-2 hidden text-sm font-semibold 640:block'>
              Next
            </span>
            <span className='my-auto rotate-180'>
              <Arrow />
            </span>
          </button>
        </div>
      </div>
    );

  return (
    <div id='react_paginate_wrapper' className='relative'>
      <ReactPaginate
        forcePage={page}
        breakLabel='...'
        className='x-center flex w-full gap-1 py-4'
        onPageChange={({ selected }) => handleChange(selected + 1)}
        pageLinkClassName={clsx('h-10 py-1.5 rounded-lg px-2')}
        activeClassName={'bg-primary-main rounded-lg font-medium text-white'}
        pageRangeDisplayed={1}
        pageCount={totalPages ?? 1}
        nextLabel={
          <button
            className='pagination-button absolute right-5 top-0 my-auto ml-auto flex h-full rounded-xl disabled:cursor-not-allowed 640:-mr-5 640:px-5'
            onClick={() => goto((page ?? 0) + 1)}
            disabled={last || disabled || fetching}
          >
            <span className='my-auto mr-2 hidden text-sm font-semibold 640:block'>
              Next
            </span>
            <span className='my-auto rotate-180'>
              <Arrow />
            </span>
          </button>
        }
        previousLabel={
          <button
            className='pagination-button absolute left-5 top-0 my-auto mr-auto flex h-full rounded-xl disabled:cursor-not-allowed 640:-ml-5 640:px-5'
            onClick={() => goto((page ?? 0) - 1)}
            disabled={first || disabled || fetching}
          >
            <span className='my-auto'>
              <Arrow />
            </span>
            <span className='my-auto ml-2 hidden text-sm font-semibold 640:block'>
              Previous
            </span>
          </button>
        }
        renderOnZeroPageCount={null}
      />
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
      className={'text-primary-main'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.3 8.99961C15.3 9.3724 14.9978 9.67461 14.625 9.67461L5.05092 9.67461L8.7929 13.238C9.06162 13.4964 9.07 13.9237 8.81161 14.1925C8.55322 14.4612 8.12592 14.4696 7.8572 14.2112L2.9072 9.48617C2.77485 9.35891 2.70005 9.18322 2.70005 8.99961C2.70005 8.816 2.77485 8.64031 2.9072 8.51305L7.8572 3.78805C8.12592 3.52966 8.55323 3.53804 8.81161 3.80676C9.07 4.07548 9.06162 4.50279 8.7929 4.76117L5.05092 8.32461L14.625 8.32461C14.9978 8.32461 15.3 8.62682 15.3 8.99961Z'
        fill='currentColor'
      />
    </svg>
  );
};
