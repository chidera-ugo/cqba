import { ColumnDef } from '@tanstack/react-table';
import { Pill } from 'components/common/Pill';
import { ProfileCard } from 'components/common/ProfileCard';
import { TableAction } from 'components/core/Table/TableAction';
import { TableCell } from 'components/core/Table/TableCell';
import { useBudgetActionOptions } from 'components/modules/budgeting/BudgetCard';
import { useMemo } from 'react';
import { IBudget } from 'types/budgeting/Budget';
import { formatDate } from 'utils/formatters/formatDate';

export const useColumns = () => {
  const { options } = useBudgetActionOptions();

  const columns = useMemo<ColumnDef<IBudget>[]>(
    () => [
      {
        header: 'Employee',
        accessorKey: 'employee',
        enableColumnFilter: false,
        cell: ({ row }) => {
          const { employee } = row.original;
          return (
            <ProfileCard
              title={employee.fullName}
              subTitle={employee.department}
              avatar={employee.avatar}
            />
          );
        },
      },
      {
        header: 'Request',
        accessorKey: 'request.title',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Date/Time',
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
      {
        header: () => (
          <span className='block h-full w-full pr-3 text-right'>Actions</span>
        ),
        id: 'actions',
        accessorKey: 'id',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const id = getValue() as any;
          return <TableAction options={options} id={id} />;
        },
      },
    ],
    []
  );

  return { columns };
};
