import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';

import { useColumns } from './useColumns';
import { useRouter } from 'next/router';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { generateTableEntries } from 'utils/generators/generateTableEntries';
import { Table } from 'components/core/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { TransactionDetails } from 'components/modules/transactions/TransactionDetails';

interface Props {
  reset?: () => void;
  filters?: Record<string, unknown>;
  setFilters?: Dispatch<SetStateAction<Record<string, string>>>;
  slot?: JSX.Element;
}

export const AllTransactionsTable = ({
  slot,
  reset,
  filters,
  setFilters,
}: Props) => {
  const { push } = useRouter();

  const [currentTransaction, setCurrentTransaction] = useState<any | null>(
    null
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters, columnFilters]);

  const {
    isLoading,
    isError,
    data: res,
  } = useMakeDummyHttpRequest({
    method: 'get',
    res: generateTableEntries<any>(
      {
        id: '',
        accountName: 'John Doe',
        amount: 200000,
        type: 'credit',
        status: 'successful',
        createdAt: new Date().toISOString(),
      },
      10
    ),
  });

  useEffect(() => {
    if (!!res) setData(res.data);
  }, [res]);

  const [data, setData] = useState<PaginatedResponse<any> | undefined>(
    res?.data
  );

  const { columns } = useColumns();

  function close() {
    setCurrentTransaction(null);
    push('/wallet', undefined, {
      scroll: false,
    });
  }

  return (
    <>
      <RightModalWrapper
        title='Transaction details'
        show={!!currentTransaction}
        {...{ close }}
        closeOnClickOutside
        childrenClassname='p-0'
      >
        {currentTransaction && (
          <TransactionDetails transaction={currentTransaction} />
        )}
      </RightModalWrapper>

      <Table<any>
        title='transactions'
        headerSlot={slot}
        dontScrollToTopOnPageChange
        onRowClick={(transaction) => {
          setCurrentTransaction(transaction);
        }}
        onFilterClick={
          !setFilters
            ? undefined
            : (filter) => setFilters(({ [filter]: _, ...rest }) => rest)
        }
        returnOriginalOnRowClick
        accessor='id'
        mustHaveRange
        {...{
          isLoading,
          filters,
          data,
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
        reset={() => {
          setFilters && setFilters({});
          setPagination({
            pageIndex: 0,
            pageSize: 10,
          });
          setSorting([]);
          reset && reset();
        }}
        emptyTableText='You have not processed any transactions on this account yet.'
      />
    </>
  );
};
