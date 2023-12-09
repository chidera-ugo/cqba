import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useUpdateProfile(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<
    { firstName: string; lastName: string; phone: string },
    null
  >({
    method: 'put',
    url: '/profile',
    service: 'auth',
    options,
  });
}
