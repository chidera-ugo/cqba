import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCreatePin(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ pin: string }, any>({
    url: '/create-pin',
    service: 'transactions',
    options,
  });
}
