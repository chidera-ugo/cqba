import { NoData } from 'components/core/Table/NoData';
import { MobileWalletTransactionsList } from 'components/modules/transactions/MobileWalletTransactionsList';
import { TransactionReceipt } from 'components/modules/transactions/TransactionReceipt';
import { useAppContext } from 'context/AppContext';
import { useGetWalletTransactions } from 'hooks/api/wallet/useGetWalletTransactions';
import { UseUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useEffect, useState } from 'react';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import card from '/public/mockups/transactions.jpg';
import { IWalletTransaction } from 'types/transaction';
import { getDateRange } from 'utils/getters/getDateRange';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';

interface Props {
  slot?: JSX.Element;
  search: string;
  walletId?: string;
  budgetId?: string;
  isLoading?: boolean;
  isError?: boolean;
  canNotShowData?: boolean;
}

export const WalletTransactionsTable = ({
  slot,
  filters,
  setFilters,
  search,
  pagination,
  setPagination,
  range,
  walletId,
  canNotShowData,
  budgetId,
  isLoading: _isLoading,
  isError: _isError,
}: Props & UseUrlManagedState) => {
  const [transactionId, setTransactionId] = useState<any | null>(null);

  const { screenSize } = useAppContext().state;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters, columnFilters, search]);

  const {
    isLoading: _l,
    isError: _e,
    data: res,
    isRefetching,
  } = useGetWalletTransactions(
    !!search
      ? {
          range: getDateRange({ days: 90 }),
          pageIndex: 1,
          pageSize: pagination.pageSize,
          search,
          walletId,
          budgetId,
        }
      : {
          range,
          type: filters?.transactionType,
          pageIndex: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          walletId,
          budgetId: budgetId ?? filters.budgetId,
        }
  );

  const isLoading = _l || _isLoading;
  const isError = _e || _isError;

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  const [data, setData] = useState<
    PaginatedResponse<IWalletTransaction> | undefined
  >(res);

  const { columns } = useColumns();

  function closeModal() {
    setTransactionId(null);
  }

  if (res && !res?.docs?.length)
    return (
      <NoData
        processing={isLoading || isRefetching}
        title='Stay on top of your transactions'
        imageSrc={card}
        subTitle={`Creating a budget is the first step to financial success. Define your spending limits and allocate resources.`}
      />
    );

  return (
    <>
      <RightModalWrapper
        title='Transaction details'
        show={!!transactionId}
        {...{ closeModal }}
        closeOnClickOutside
        childrenClassname='p-0'
      >
        {transactionId && <TransactionReceipt transactionId={transactionId} />}
      </RightModalWrapper>

      {screenSize?.mobile ? (
        <MobileWalletTransactionsList
          {...{
            pagination,
            setPagination,
            data,
            isLoading,
            isError,
            isRefetching,
          }}
          onRowClick={(transactionId) => setTransactionId(transactionId)}
        />
      ) : (
        <Table<IWalletTransaction>
          title='wallet transactions'
          headerSlot={slot}
          dontScrollToTopOnPageChange
          onRowClick={(transactionId) => {
            setTransactionId(transactionId);
          }}
          onFilterClick={
            !setFilters
              ? undefined
              : (filter) => setFilters(({ [filter]: _, ...rest }) => rest)
          }
          accessor='_id'
          mustHaveRange
          emptyTableText={'No wallet transactions yet'}
          {...{
            isLoading,
            data,
            canNotShowData,
            setColumnFilters,
            columnFilters,
            currentSearchColumn,
            pagination,
            columns,
            setPagination,
            setCurrentSearchColumn,
            setSorting,
            sorting,
            isError,
          }}
        />
      )}
    </>
  );
};
