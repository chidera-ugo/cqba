import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useGetTransferFee(
  options?: UseMutationOptions<{ transferFee: number }, unknown, void, unknown>
) {
  return useTMutation<null, { transferFee: number }>({
    method: 'get',
    url: `/transfer-fee`,
    service: 'budgets',
    options,
  });
}
