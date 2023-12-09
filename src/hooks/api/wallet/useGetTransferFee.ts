import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useGetTransferFee(
  amount: number,
  budgetId: string,
  options?: UseMutationOptions<{ transferFee: number }, unknown, void, unknown>
) {
  return useTMutation<null, { transferFee: number }>({
    method: 'get',
    url: `/transfer-fee?amount=${amount}&budget=${budgetId}`,
    service: 'budgets',
    options,
  });
}
