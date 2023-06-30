import { ColumnDef } from '@tanstack/react-table';
import { TableCell } from 'components/core/Table/TableCell';
import { IDepartment } from 'hooks/api/departments/useGetAllDepartments';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatters/formatDate';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<IDepartment>[]>(
    () => [
      {
        header: 'Department',
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
    ],
    []
  );

  return { columns };
};
