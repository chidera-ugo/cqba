import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { Pill } from 'components/common/Pill';
import { TableCell } from 'components/core/Table/TableCell';
import { IWalletTransaction } from 'hooks/api/wallet/useGetWalletTransactions';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatters/formatDate';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<IWalletTransaction>[]>(
    () => [
      {
        header: 'Transaction ID',
        accessorKey: '_id',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const value = getValue() as any;

          return (
            <span
              className={clsx(
                value === 'credit' && 'text-green-500',
                'capitalize'
              )}
            >
              {value}
            </span>
          );
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        enableColumnFilter: false,
        cell: (props) => <TableCell isAmount {...props} />,
      },
      {
        header: 'Budget',
        accessorKey: 'budget.name',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const value = getValue() as any;

          if (!value) return '----';

          return (
            <div className={'flex'}>
              <span className='pill_gray capitalize'>{value}</span>
            </div>
          );
        },
      },
      {
        header: 'Date/Time',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          return <div>{formatDate(getValue() as string, 'semi-full')}</div>;
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const val = getValue() as string;
          return (
            <Pill
              config={{
                success: 'successful',
                pending: 'pending',
              }}
              value={val}
            />
          );
        },
      },
    ],
    []
  );

  return { columns };
};
