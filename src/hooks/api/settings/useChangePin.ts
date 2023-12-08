import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useChangePin(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<
    { newPin?: string; currentPin?: string },
    { message: string }
  >({
    url: '/change-pin',
    service: 'settings',
    options,
  });
}
