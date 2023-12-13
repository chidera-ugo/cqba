import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useDeleteOwner(
  options?: UseMutationOptions<null, unknown, void, unknown>
) {
  return useTMutation<{ id: string }, null>({
    method: 'patch',
    url: `/delete-owner-info`,
    service: 'organizations',
    options,
  });
}
