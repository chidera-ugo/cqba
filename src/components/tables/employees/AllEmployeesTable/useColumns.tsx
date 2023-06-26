import { ColumnDef } from '@tanstack/react-table';
import { Pill } from 'components/common/Pill';
import { TableCell } from 'components/core/Table/TableCell';
import {
  EmployeeAction,
  EmployeeActions,
} from 'components/tables/employees/AllEmployeesTable/EmployeeActions';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatters/formatDate';

interface Args {
  handleActionClick: (employee: IEmployee, action: EmployeeAction) => void;
}

export const useColumns = ({ handleActionClick }: Args) => {
  const columns = useMemo<ColumnDef<IEmployee>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'firstName',
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
        accessorKey: 'departmentTitle',
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
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          return <div>{formatDate(getValue() as string, 'semi-full')}</div>;
        },
      },
      {
        header: 'Actions',
        accessorKey: 'id',
        enableColumnFilter: false,
        cell: ({ row }) => {
          const employee = row.original;

          return (
            <EmployeeActions
              handleActionClick={(action) => {
                handleActionClick(employee, action);
              }}
              employee={employee}
            />
          );
        },
      },
    ],
    []
  );

  return { columns };
};
