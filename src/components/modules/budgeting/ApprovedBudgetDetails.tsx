import { ActiveBudgetCard } from 'components/modules/budgeting/ActiveBudgetCard';
import { WalletTransactionsTable } from 'components/tables/wallet/WalletTransactionsTable';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
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
      <ActiveBudgetCard showActions getColor={getColor} {...budget} />

      {budget.status !== 'closed' && (
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
      )}
    </div>
  );
};
