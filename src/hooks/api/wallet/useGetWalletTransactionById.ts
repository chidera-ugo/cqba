import { UseQueryOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetWalletTransactionById(
  id: string,
  options?: UseQueryOptions<any, any, IWalletTransactionDetails, string[]>
) {
  return useTQuery<IWalletTransactionDetails>({
    queryKey: ['wallet_transactions', id],
    url: `/history/${id}`,
    service: 'wallet',
    options: {
      ...options,
      meta: {
        silent: true,
      },
    },
  });
}

export interface IWalletTransactionDetails {
  _id: string;
  type: string;
  organization: string;
  wallet: string;
  status: string;
  amount: number;
  currency: string;
  balanceAfter: number;
  balanceBefore: number;
  scope: string;
  fee: number;
  paymentMethod: string;
  providerRef: string;
  narration: string;
  reference: string;
  meta: Meta;
  createdAt: string;
  updatedAt: string;
  budget?: IBudget;
  __v: number;
}

interface Meta {
  sourceAccount: SourceAccount;
  counterparty: CounterParty;
}

interface SourceAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

interface CounterParty {
  _id: string;
  accountNumber: string;
  bankCode: string;
  organization: string;
  __v: number;
  accountName: string;
  bankName: string;
  createdAt: string;
  updatedAt: string;
}
