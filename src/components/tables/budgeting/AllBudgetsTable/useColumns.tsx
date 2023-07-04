import { ColumnDef } from '@tanstack/react-table';
import { ProfileCard } from 'components/common/ProfileCard';
import { TableCell } from 'components/core/Table/TableCell';
import { CategoryPill } from 'components/modules/categories/DefaultCategories';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useGetColorByChar } from 'hooks/common/useGetColorByChar';
import { useMemo } from 'react';

export const useColumns = () => {
  const { getColor } = useGetColorByChar();

  const columns = useMemo<ColumnDef<IBudget>[]>(
    () => [
      {
        header: 'Employee',
        accessorKey: 'creator.firstName',
        enableColumnFilter: false,
        cell: ({ row }) => {
          const { creator, departmentTitle } = row.original;

          return (
            <ProfileCard
              getBackgroundColor={getColor}
              title={`${creator?.firstName} ${creator?.lastName}`}
              subTitle={`${departmentTitle} Department`}
            />
          );
        },
      },
      {
        header: 'Request',
        accessorKey: 'title',
        enableColumnFilter: false,
        cell: (props) => <TableCell {...props} />,
      },
      {
        header: 'Date/Time',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        cell: (props) => <TableCell isDate {...props} />,
      },
      {
        header: 'Category',
        accessorKey: 'categoryTitle',
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const val = getValue() as string;

          return (
            <div className={'flex'}>
              <CategoryPill category={val} {...{ getColor }} />
            </div>
          );
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        enableColumnFilter: false,
        cell: (props) => <TableCell isAmount {...props} />,
      },
    ],
    []
  );

  return { columns };
};
