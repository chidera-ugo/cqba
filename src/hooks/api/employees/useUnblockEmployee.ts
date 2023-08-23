import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useUnblockEmployee(
  employeeId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'patch',
    url: `/${employeeId}/unblock`,
    service: 'employees',
    options,
  });
}
