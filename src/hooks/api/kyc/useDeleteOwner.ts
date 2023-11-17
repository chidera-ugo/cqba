import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';
import { useTMutation } from 'hooks/api/useTMutation';

export function useDeleteOwner(
  options?: UseMutationOptions<null, unknown, void, unknown>
) {
  const { user } = useAppContext().state;

  return useTMutation<{ id: string }, null>({
    method: 'patch',
    url: `/${user?.organizationId}/delete-owner-info`,
    service: 'organizations',
    options,
  });
}
