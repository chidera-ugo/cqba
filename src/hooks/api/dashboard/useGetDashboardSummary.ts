import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';
import { DateRange } from 'utils/getters/getDateRange';

interface GetDashboardSummaryRes {
  budgetBalance: number;
  activeBudgetCount: number;
  requestsCount: number;
}

export function useGetDashboardSummary(
  range: DateRange,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const params = generateUrlParamsFromObject({
    data: {
      from: range.start,
      to: range.end,
    },
  });

  return useTQuery<GetDashboardSummaryRes>({
    queryKey: ['dashboard_overview', params],
    url: `/summary${params}`,
    service: 'overview',
    options: {
      ...options,
      meta: {
        silent: true,
      },
    },
  });
}
