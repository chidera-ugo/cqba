import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useAddDepartment(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ title: string }, any>({
    url: '',
    service: 'departments',
    options,
  });
}
