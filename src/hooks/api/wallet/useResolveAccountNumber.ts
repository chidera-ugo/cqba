import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

interface UseResolveAccountNumberRes {
  accountName: string;
  accountNumber: string;
  bankId: string;
  bankName: string;
  bankCode: string;
}

export function useResolveAccountNumber(
  options?: UseMutationOptions<
    UseResolveAccountNumberRes,
    unknown,
    void,
    unknown
  >
) {
  return useTMutation<
    { bankCode: string; accountNumber: string },
    UseResolveAccountNumberRes
  >({
    url: '/resolve-account',
    service: 'budgets',
    options,
  });
}
