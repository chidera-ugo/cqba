import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useDeleteInvite(
  employeeId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'patch',
    url: `/${employeeId}/delete-invite`,
    service: 'employees',
    options,
  });
}
