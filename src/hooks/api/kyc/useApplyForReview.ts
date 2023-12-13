import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useApplyForReview(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'patch',
    url: `/apply-for-approval`,
    service: 'organizations',
    options,
  });
}
