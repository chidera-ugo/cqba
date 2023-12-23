import { REFETCH_INTERVAL } from 'constants/api/refetch_interval';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { PaginatedResponse } from 'types/Table';

export function useGetBudgetApprovalRequests() {
  const { isVerified } = useIsVerified();

  return useTQuery<PaginatedResponse<IBudget>>({
    queryKey: ['budgets_requests_count'],
    url: `?paginated=false&status=pending`,
    service: 'budgets',
    options: {
      enabled: !!isVerified,
      refetchInterval: REFETCH_INTERVAL,
      meta: { silent: true },
    },
  });
}
