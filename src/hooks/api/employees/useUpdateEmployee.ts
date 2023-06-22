import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

interface UpdateEmployeeDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  departmentId?: string;
}

export function useUpdateEmployee(
  employeeId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<UpdateEmployeeDto, any>({
    method: employeeId ? 'put' : 'post',
    url: employeeId ? `/${employeeId}` : '',
    service: 'employees',
    options,
  });
}
