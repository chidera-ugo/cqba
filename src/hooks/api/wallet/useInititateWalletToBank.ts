import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

interface UseInititateWalletToBankDto {
  amount: number;
  accountNumber: string;
  bankCode: string;
  pin: string;
}

export function useInititateWalletToBank(
  budgetId: string,
  options?: UseMutationOptions<
    UseInititateWalletToBankDto,
    unknown,
    void,
    unknown
  >
) {
  return useTMutation<UseInititateWalletToBankDto, any>({
    url: `/${budgetId}/transfer/initiate`,
    service: 'budgets',
    options,
  });
}
