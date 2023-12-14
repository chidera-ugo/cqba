import { UseQueryOptions } from '@tanstack/react-query';
import { REFETCH_INTERVAL } from 'constants/api/refetch_interval';
import { useTQuery } from 'hooks/api/useTQuery';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';
import { DateRange } from 'utils/getters/getDateRange';

export interface TCashFlowChart {
  curreny: string;
  expense: Amount;
  income: Amount;
  trend: Trend[];
}

interface Amount {
  value: number;
  percentageDiff?: number;
}

interface Trend {
  from: string;
  to: string;
  income: number;
  expense: number;
}

export function useGetCashflowChart(
  type: string,
  period: string,
  range: DateRange,
  currency: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _params = generateUrlParamsFromObject({
    data: {
      period,
      currency,
      type,
      from: range?.start,
      to: range?.end,
    },
  });

  return useTQuery<TCashFlowChart>({
    queryKey: ['cash_flow_chart', _params],
    url: `/trends/cashflow${_params}`,
    service: 'overview',
    options: {
      ...options,
      enabled: !!currency && !!type,
      refetchInterval: REFETCH_INTERVAL,
      meta: {
        silent: true,
      },
    },
  });
}
