import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

interface GetDashboardSummaryRes {
  subAccountBalance: number;
  budgetBalance: number;
  activeBudgetCount: number;
  subAccountsCount: number;
  requestsCount: number;
}

export function useGetDashboardSummary(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<GetDashboardSummaryRes>({
    queryKey: ['dashboard-summary'],
    url: `/summary`,
    service: 'dashboard',
    options: {
      ...options,
      meta: {
        silent: true,
      },
    },
  });
}
