import { ColumnDef } from '@tanstack/react-table';
import { TableCell } from 'components/core/Table/TableCell';
import { IDepartment } from 'hooks/api/departments/useGetAllDepartments';
import { useMemo } from 'react';

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
      {
        header: 'Balance',
        accessorKey: 'balance',
        enableColumnFilter: false,
        cell: (props) => <TableCell isAmount {...props} />,
      },
    ],
    []
  );

  return { columns };
};
