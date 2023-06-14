import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useResetPassword(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ code: string; userId: string; password: string }, any>({
    url: '/password-reset',
    service: 'auth',
    options,
  });
}
