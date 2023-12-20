import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { TableCell } from 'components/core/Table/TableCell';
import { Frozen } from 'components/modules/budgeting/ActiveBudgetCard';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useMemo } from 'react';
import { handleSort } from 'utils/handlers/handleSort';

export const useColumns = (isProjectPaused?: boolean) => {
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
      {
        header: 'Threshold',
        accessorKey: 'threshold',
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
        header: 'Available',
        accessorKey: 'balance',
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
        header: 'Due Date',
        accessorKey: 'expiry',
        enableColumnFilter: false,
        cell: (props) => <TableCell isDate {...props} />,
      },
      {
        header: 'Beneficiaries',
        accessorKey: 'beneficiaries',
        enableColumnFilter: false,
        cell: ({ row }) => {
          const { paused, beneficiaries } = row.original;

          if (paused || isProjectPaused)
            return (
              <div className={'flex'}>
                <Frozen className={'text-xs'} />
              </div>
            );

          return (
            <>
              <div className={clsx('relative flex')}>
                {handleSort({
                  data: beneficiaries?.slice(0, 5),
                  sortBy: 'email',
                  direction: 'desc',
                })?.map(({ email, avatar, firstName, lastName }, i) => {
                  return (
                    <div
                      key={email}
                      className={clsx('block', i > 0 && '-ml-1')}
                    >
                      <Avatar
                        avatar={avatar}
                        className={clsx('ring-2 ring-white')}
                        size={27}
                        key={email}
                        initials={
                          !!firstName
                            ? `${firstName?.charAt(0)}${lastName?.charAt(0)}`
                            : email?.charAt(0)
                        }
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
