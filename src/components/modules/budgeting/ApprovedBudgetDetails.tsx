import { BudgetCard } from 'components/modules/budgeting/BudgetCard';
import { WalletTransactionsTable } from 'components/tables/wallet/WalletTransactionsTable';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { UseUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';

export const ApprovedBudgetDetails = ({
  budget,
  range,
  setRange,
  search,
  pagination,
  setPagination,
  setFilters,
  filters,
}: { budget: IBudget; search: string } & UseUrlManagedState) => {
  const { getColor } = useGetColorByChar();

  return (
    <div>
      <BudgetCard showActions getColor={getColor} {...budget} />

      <div className='mt-5'>
        <WalletTransactionsTable
          search={search}
          budgetId={budget?._id}
          {...{
            filters,
            setFilters,
            pagination,
            setPagination,
            range,
            setRange,
          }}
        />
      </div>
    </div>
  );
};
