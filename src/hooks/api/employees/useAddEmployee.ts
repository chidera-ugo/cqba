import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface AddEmployeeDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
}

export function useAddEmployee(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<AddEmployeeDto, any>({
    url: '',
    service: 'employees',
    options,
  });
}
