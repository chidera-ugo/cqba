import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IWalletTransaction {
  _id: string;
  type: string;
  budget: Budget;
  status: string;
  amount: number;
  currency: string;
  scope: string;
  fee: number;
  reference: string;
  createdAt: string;
  id: string;
}

export interface Budget {
  _id: string;
  name: string;
}

export function useGetWalletTransactions(
  params: {
    search?: string;
    type?: string;
  },
  options?: UseQueryOptions<
    any,
    any,
    PaginatedResponse<IWalletTransaction>,
    string[]
  >
) {
  const { primaryWallet } = useManageWallets();

  const _params = generateUrlParamsFromObject({
    data: params,
  });

  return useTQuery<PaginatedResponse<IWalletTransaction>>({
    queryKey: ['wallet_transactions', String(primaryWallet?._id), _params],
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
