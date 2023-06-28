import { ColumnDef } from '@tanstack/react-table';
import { Pill } from 'components/common/Pill';
import { TableAction } from 'components/core/Table/TableAction';
import { TableCell } from 'components/core/Table/TableCell';
import { Archive, ClosedLock, Edit } from 'components/svgs/Icons_TableActions';
import { SubAccountAction } from 'components/tables/sub-accounts/AllSubAccountsTable/index';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatters/formatDate';

interface Args {
  handleActionClick: (account: ISubAccount, action: SubAccountAction) => void;
}

export const useColumns = ({ handleActionClick }: Args) => {
  const columns = useMemo<ColumnDef<ISubAccount>[]>(
    () => [
      {
        header: 'Account Holder',
        accessorKey: 'accountHolderName',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Email',
        accessorKey: 'accountHolderEmail',
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
        header: 'Balance',
        accessorKey: 'balance',
        enableColumnFilter: false,
        cell: (props) => <TableCell isAmount {...props} />,
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
                pending: 'on-hold',
                failed: 'archived',
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
        header: () => (
          <span className='block h-full w-full pr-4 text-right'>Actions</span>
        ),
        id: 'actions',
        accessorKey: 'id',
        enableColumnFilter: false,
        cell: ({ row, getValue, table }) => {
          const id = getValue() as any;
          const isLastRow =
            row.index > 2 &&
            row.index === table.getRowModel().flatRows.length - 1;

          return (
            <TableAction
              options={[
                {
                  title: 'Edit Account',
                  icon: <Edit />,
                  onClick: () =>
                    handleActionClick(row.original, 'edit account'),
                },
                {
                  title: 'Place on hold',
                  icon: <ClosedLock />,
                  onClick: () =>
                    handleActionClick(row.original, 'place account on hold'),
                },
                {
                  title: 'Archive',
                  icon: <Archive />,
                  onClick: () =>
                    handleActionClick(row.original, 'archive account'),
                },
              ]}
              {...{
                id,
                isLastRow,
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
