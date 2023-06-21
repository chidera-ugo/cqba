import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

interface GetDashboardSummaryRes {
  subAccountBalance?: number;
  budgetBalance?: number;
  activeBudgetCount?: number;
  subAccountsCount?: number;
  requestsCount?: number;
}

export function useGetDashboardSummary(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const { isVerified } = useIsVerified();

  return useTQuery<GetDashboardSummaryRes>({
    queryKey: ['dashboard-summary'],
    url: `/summary`,
    service: 'dashboard',
    options: {
      enabled: !!isVerified,
      ...options,
    },
  });
}
