import { ColumnDef } from '@tanstack/react-table';
import { Pill } from 'components/common/Pill';
import { TableCell } from 'components/core/Table/TableCell';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatters/formatDate';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<IBudget>[]>(
    () => [
      {
        header: 'Request',
        accessorKey: 'title',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Created',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          return <div>{formatDate(getValue() as string, 'semi-full')}</div>;
        },
      },
      {
        header: 'Priority',
        accessorKey: 'priority',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const val = getValue() as string;
          return (
            <Pill
              config={{
                failed: 'high',
                pending: 'low',
              }}
              suffix='priority'
              value={val}
            />
          );
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        enableColumnFilter: false,
        cell: (props) => <TableCell isAmount {...props} />,
      },
    ],
    []
  );

  return { columns };
};
