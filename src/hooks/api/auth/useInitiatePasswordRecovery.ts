import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useInitiatePasswordRecovery(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ email: string }, any>({
    url: '/forgot-password',
    service: 'auth',
    options,
  });
}
