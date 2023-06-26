import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function usePlaceAccountOnHold(
  accountId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'patch',
    url: `/${accountId}/on-hold`,
    service: 'sub-accounts',
    options,
  });
}
