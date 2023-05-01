import { ColumnDef } from '@tanstack/react-table';
import { TableCell } from 'components/core/Table/TableCell';
import { useMemo } from 'react';
import { TransactionHistoryEntry } from 'types/Transaction';
import { formatDate } from 'utils/helpers/formatters/formatDate';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<TransactionHistoryEntry>[]>(
    () => [
      {
        header: 'Transaction ID',
        accessorKey: 'id',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        enableColumnFilter: false,
        cell: (props) => <TableCell isAmount {...props} />,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        enableColumnFilter: false,
        cell: (props) => (
          <span className='capitalize'>
            <TableCell {...props} />
          </span>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const val = getValue() as string;

          const getPillColor = () => {
            if (val === 'successful') {
              return 'green-pill';
            } else if (val === 'pending') {
              return 'yellow-pill';
            } else return 'gray-pill';
          };

          return (
            <div className='flex align-middle'>
              <span className={getPillColor()}>{val}</span>
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
    ],
    []
  );

  return { columns };
};
