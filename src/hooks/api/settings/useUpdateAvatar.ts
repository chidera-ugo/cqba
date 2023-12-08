import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useUpdateAvatar(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: '/profile/avatar',
    service: 'auth',
    options,
  });
}
