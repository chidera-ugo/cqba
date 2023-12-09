import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useLogout(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: '/logout',
    service: 'auth',
    options,
  });
}
