import { ColumnDef } from '@tanstack/react-table';
import { Pill } from 'components/common/Pill';
import { TableCell } from 'components/core/Table/TableCell';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatters/formatDate';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<IEmployee>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'id',
        enableColumnFilter: false,
        cell: ({ row }) => {
          const { firstName, lastName } = row.original;

          return (
            <span>
              {firstName} {lastName}
            </span>
          );
        },
      },
      {
        header: 'Email',
        accessorKey: 'email',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Department',
        accessorKey: 'department',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
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
                success: 'active',
                pending: 'invited',
                failed: 'blocked',
              }}
              value={val}
            />
          );
        },
      },
      {
        header: 'Created',
        accessorKey: 'updatedAt',
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
