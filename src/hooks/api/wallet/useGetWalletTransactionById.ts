import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { PaginatedResponse } from 'types/Table';
import { IWalletTransaction } from 'types/transaction';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';
import { DateRange } from 'utils/getters/getDateRange';

type Params = {
  range: DateRange;
  pageIndex: number;
  search?: string;
  type?: string;
  budgetId?: string;
  walletId?: string;
};

export function useGetWalletTransactions(
  params: Params,
  options?: UseQueryOptions<
    any,
    any,
    PaginatedResponse<IWalletTransaction>,
    string[]
  >
) {
  const { primaryWallet } = useManageWallets();

  const {
    range: { start, end },
    search,
    pageIndex,
    type,
    walletId,
    budgetId,
  } = params;

  const _params = generateUrlParamsFromObject({
    data: {
      search,
      from: start,
      to: end,
      wallet: walletId,
      budget: budgetId,
      page: pageIndex,
      type,
    },
  });

  return useTQuery<PaginatedResponse<IWalletTransaction>>({
    queryKey: ['wallet_transactions', _params],
    url: `/history${_params}`,
    service: 'wallet',
    options: {
      ...options,
      enabled: !!primaryWallet?._id,
      meta: {
        silent: true,
      },
    },
  });
}
