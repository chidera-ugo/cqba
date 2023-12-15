import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

interface UseInititateWalletToBankDto {
  amount: number;
  accountNumber: string;
  bankCode: string;
  pin: string;
}

interface Res {
  message: string;
  status: 'failed' | 'pending';
}

export function useInititateWalletToBank(
  budgetId: string,
  options?: UseMutationOptions<Res, unknown, void, unknown>
) {
  return useTMutation<UseInititateWalletToBankDto, Res>({
    url: `/${budgetId}/transfer/initiate`,
    service: 'budgets',
    options,
  });
}
