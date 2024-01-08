import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { ActionDropdown } from 'components/core/Table/ActionDropdown';
import { TableCell } from 'components/core/Table/TableCell';
import { UserRole, UserRoles } from 'enums/employee_enum';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useMemo } from 'react';

export type EmployeeAction =
  | 'remove_user'
  | 'edit'
  | 'block'
  | 'unblock'
  | 'delete_invite'
  | null;

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
          const val = getValue() as UserRole;

          return (
            <div className='flex w-min'>
              <div className={clsx('pill_gray capitalize')}>
                {UserRoles[val]}
              </div>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        accessorKey: '_id',
        enableColumnFilter: false,
        cell: ({ row, table }) => {
          const employee = row.original;

          const isEmployeeActive = employee.status === 'active';

          return (
            <div className={'mr-auto flex'}>
              <ActionDropdown
                totalRows={table?.getRowModel()?.rows?.length}
                index={row?.index}
                withoutBorders
                options={
                  isEmployeeActive
                    ? [
                        {
                          onClick: () =>
                            handleActionClick(employee, 'remove_user'),
                          title: 'Remove User',
                        },
                      ]
                    : [
                        {
                          onClick: () =>
                            handleActionClick(employee, 'delete_invite'),
                          title: 'Delete Invite',
                        },
                      ]
                }
                id={`employee_actions_${employee._id}`}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  return { columns };
};
