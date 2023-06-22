import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useDeleteEmployee(
  employeeId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'delete',
    url: `/${employeeId}`,
    service: 'employees',
    options,
  });
}
