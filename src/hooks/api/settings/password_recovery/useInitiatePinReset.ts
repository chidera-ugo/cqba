import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useInitiatePinReset(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ password: string }, { hash: string }>({
    url: '/forgot-pin',
    service: 'settings',
    options,
  });
}
