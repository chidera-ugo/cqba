import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useInitiateResetPin(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ password: string }, any>({
    url: '/forgot-pin',
    service: 'settings',
    options,
  });
}
