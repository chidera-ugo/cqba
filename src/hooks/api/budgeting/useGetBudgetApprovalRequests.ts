import { REFETCH_INTERVAL } from 'constants/api/refetch_interval';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';

export function useGetBudgetApprovalRequests() {
  return useTQuery<PaginatedResponse<IBudget>>({
    queryKey: ['budgets_requests_count'],
    // Todo: check if you need to pass createdByUser
    url: `?paginated=false&status=pending`,
    service: 'budgets',
    options: {
      refetchInterval: REFETCH_INTERVAL,
      meta: { silent: true },
    },
  });
}
