import { ColumnDef } from '@tanstack/react-table';
import { Pill } from 'components/common/Pill';
import { TableCell } from 'components/core/Table/TableCell';
import { useMemo } from 'react';
import { IBudget } from 'types/budgeting/Budget';
import { formatDate } from 'utils/helpers/formatters/formatDate';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<IBudget>[]>(
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
