import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { TableCell } from 'components/core/Table/TableCell';
import { UserRole, UserRoles } from 'enums/employee_enum';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useMemo } from 'react';
import { handleSort } from 'utils/handlers/handleSort';

export const useColumns = () => {
  const { getColor } = useGetColorByChar();

  const columns = useMemo<ColumnDef<IBudget>[]>(
    () => [
      {
        header: 'Budget',
        accessorKey: 'name',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        enableColumnFilter: false,
        cell: (props) => (
          <TableCell
            currency={props?.row?.original?.currency}
            isAmount
            {...props}
          />
        ),
      },
      {
        header: 'Spent',
        accessorKey: 'amountUsed',
        enableColumnFilter: false,
        cell: (props) => (
          <TableCell
            currency={props?.row?.original?.currency}
            isAmount
            {...props}
          />
        ),
      },
      // {
      //   header: 'Allocated',
      //   accessorKey: '',
      //   enableColumnFilter: false,
      //   cell: (props) => (
      //     <TableCell
      //       currency={props?.row?.original?.currency}
      //       isAmount
      //       {...props}
      //     />
      //   ),
      // },
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
        header: 'Due Date',
        accessorKey: 'expiry',
        enableColumnFilter: false,
        cell: (props) => <TableCell isDate {...props} />,
      },
      {
        header: 'Beneficiaries',
        accessorKey: 'beneficiaries',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const beneficiaries = getValue() as { email: string }[];

          return (
            <>
              <div className={clsx('relative flex')}>
                {handleSort({
                  data: beneficiaries,
                  sortBy: 'email',
                })?.map(({ email }, i) => {
                  return (
                    <div
                      key={email}
                      className={clsx('absolute', 'right-0 top-0 z-10')}
                      style={{
                        zIndex: 10 + i,
                        right: 23 * i,
                      }}
                    >
                      <Avatar
                        className={clsx('-ml-2 ring-2 ring-white')}
                        size={27}
                        key={email}
                        char={email.charAt(0)}
                        getBackgroundColor={getColor}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return { columns };
};
