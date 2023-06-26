import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useUpdateSubAccount(
  id?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ employeeId: string; departmentId: string }, any>({
    method: id ? 'put' : 'post',
    url: id ? `/${id}` : '',
    service: 'sub-accounts',
    options,
  });
}
