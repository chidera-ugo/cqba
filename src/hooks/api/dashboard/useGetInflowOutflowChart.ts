import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';
import { DateRange } from 'utils/getters/getDateRange';

interface InflowOutflowRes {
  chart: { date: string; volume: number }[];
  totalBalance: number;
}

export function useGetInflowOutflowChart(
  params: {
    type: string;
    duration: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY';
    dateRange: DateRange;
  },
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const { dateRange, ...rest } = params;

  const _params = generateUrlParamsFromObject({
    data: {
      ...rest,
      startDate: dateRange.start,
      endDate: dateRange.end,
    },
  });

  return useTQuery<InflowOutflowRes>({
    queryKey: ['inflow-outflow-chart', _params],
    url: `/balance-volume${_params}`,
    service: 'transactions',
    options,
  });
}
