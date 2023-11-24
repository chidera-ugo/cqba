import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';
import { useTMutation } from 'hooks/api/useTMutation';

export function useApplyForReview(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  const { user } = useAppContext().state;

  return useTMutation({
    method: 'patch',
    url: `/${user?.organization}/apply-for-approval`,
    service: 'organizations',
    options,
  });
}
