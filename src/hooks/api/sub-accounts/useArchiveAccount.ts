import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useArchiveAccount(
  accountId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'patch',
    url: `/${accountId}/archive`,
    service: 'sub-accounts',
    options,
  });
}
