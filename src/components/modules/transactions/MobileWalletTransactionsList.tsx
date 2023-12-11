import { PaginationState } from '@tanstack/react-table';
import clsx from 'clsx';
import { SimpleToast } from 'components/commons/SimpleToast';
import { Pagination as TablePagination } from 'components/core/Table/Pagination';
import { TableDataStates } from 'components/core/Table/TableDataStates';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { Dispatch, SetStateAction } from 'react';
import { PaginatedResponse } from 'types/Table';
import { IWalletTransaction } from 'types/transaction';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';

interface Props {
  data?: PaginatedResponse<IWalletTransaction>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  onRowClick: (transactionId: string) => void;
  isRefetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export const MobileWalletTransactionsList = ({
  data,
  pagination,
  setPagination,
  isRefetching,
  isError,
  isLoading,
  onRowClick,
}: Props) => {
  const fetching = isLoading || isRefetching;

  const showData = !isError && !!data?.docs?.length;

  return (
    <>
      <TableDataStates
        title={'wallet transactions'}
        {...{
          isLoading,
          isError,
          data,
        }}
      />

      {showData ? (
        <div className={'card relative rounded-xl p-0'}>
          <SimpleToast
            show={!!fetching && !!data?.docs?.length}
            className='bottom-32 left-0 1180:left-[122px]'
          >
            <div className='flex py-2'>
              <Spinner className='my-auto mr-1 h-4 text-white' />
              <span className='my-auto'>Fetching</span>
            </div>
          </SimpleToast>

          <div className={'x-between py-2 px-3'}>
            <h4
              className={'text-[10px] font-normal uppercase text-neutral-500'}
            >
              Recent Transactions
            </h4>
          </div>

          {data?.docs?.map(
            ({ status, _id, budget, currency, createdAt, amount }, i) => {
              return (
                <button
                  key={_id}
                  type={'button'}
                  className={clsx(
                    `x-between h-[60px] w-full gap-3 border-b border-gray-100 px-3 text-sm`,
                    i % 2 === 0 && 'bg-neutral-100'
                  )}
                  onClick={() => onRowClick(_id)}
                >
                  <div className={'my-auto text-left'}>
                    <div
                      className={'break-all text-sm text-black line-clamp-1'}
                    >
                      {budget?.name ?? '----'}
                    </div>

                    <div className={'text-xs text-neutral-500 line-clamp-1'}>
                      {formatDate(createdAt, 'semi-full')}
                    </div>
                  </div>

                  <div className={'my-auto w-fit'}>
                    <div className={clsx('text-right text-sm')}>
                      {currency}
                      {formatAmount({ value: amount / 100 })}
                    </div>

                    <div
                      className={clsx(
                        status === 'failed'
                          ? 'text-red-600'
                          : status === 'pending'
                          ? 'text-yellow-600'
                          : status === 'successful'
                          ? 'text-green-600'
                          : 'text-black',
                        'text-right text-xs capitalize'
                      )}
                    >
                      {status}
                    </div>
                  </div>
                </button>
              );
            }
          )}

          {pagination &&
            data?.docs?.length &&
            (pagination?.pageIndex > 0 ||
              (pagination?.pageIndex === 0 &&
                data?.docs?.length === pagination?.pageSize)) && (
              <TablePagination
                {...{
                  setPagination,
                  pagination,
                  fetching,
                  ...data,
                }}
              />
            )}
        </div>
      ) : null}
    </>
  );
};
