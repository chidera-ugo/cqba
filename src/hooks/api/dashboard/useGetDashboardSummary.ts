import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';
import { DateRange } from 'utils/getters/getDateRange';

type Value = {
  value: number;
  percentageDiff?: number;
};

interface GetDashboardSummaryRes {
  currency: string;
  accountBalance: Value;
  budgetBalance: Value;
  totalSpend: Value;
}

export function useGetDashboardSummary(
  range: DateRange,
  currency: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const params = generateUrlParamsFromObject({
    data: {
      from: range.start,
      to: range.end,
      currency,
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
