import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCompletePinReset(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ pin: string; hash: string }, { message: string }>({
    url: '/change-forgot-pin',
    service: 'settings',
    options,
  });
}
