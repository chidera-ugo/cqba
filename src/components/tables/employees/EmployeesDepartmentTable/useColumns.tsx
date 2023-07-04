import { ColumnDef } from '@tanstack/react-table';
import { TableCell } from 'components/core/Table/TableCell';
import { ISubAccountsDepartment } from 'hooks/api/sub-accounts/useGetSubAccountsByDepartment';
import { useMemo } from 'react';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<ISubAccountsDepartment>[]>(
    () => [
      {
        header: 'Department',
        accessorKey: 'title',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'No of Employees',
        accessorKey: 'employeeCount',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'No of Active Budgets',
        accessorKey: 'activeBudgetCount',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
    ],
    []
  );

  return { columns };
};
