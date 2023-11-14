import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { AppLayout } from 'components/layouts/AppLayout';
import { ApprovedBudgetDetails } from 'components/modules/budgeting/ApprovedBudgetDetails';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useRouter } from 'next/router';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export default function BudgetDetails() {
  const { query } = useRouter();

  const id = getValidQueryParam(query['budgetId']);

  const { isLoading, isError, data } = useGetBudgetById(id, {
    enabled: !!id,
  });

  return (
    <AppLayout
      title={'Budgeting'}
      breadCrumbs={[
        {
          title: 'Budgeting',
          url: !data ? '/budgeting' : `/budgeting?_t=${data.status}`,
        },
        {
          title: 'Track Expense',
        },
      ]}
    >
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <IsError description={'Failed to get budget details'} />
      ) : (
        <AppErrorBoundary>
          <ApprovedBudgetDetails data={data} />
        </AppErrorBoundary>
      )}
    </AppLayout>
  );
}
