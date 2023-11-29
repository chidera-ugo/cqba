import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
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

          if (!firstName) return <>---</>;

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
        header: 'Phone No',
        accessorKey: 'phone',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Role',
        accessorKey: 'role',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const val = getValue() as string;
          return (
            <div className='flex w-min'>
              <div className={clsx('pill_gray')}>{val}</div>
            </div>
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
              isEmployeeActive={employee.status === 'active'}
              handleActionClick={(action) => {
                handleActionClick(employee, action);
              }}
            />
          );
        },
      },
    ],
    []
  );

  return { columns };
};
