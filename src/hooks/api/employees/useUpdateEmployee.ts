import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

interface UpdateEmployeeDto {
  email: string;
  phone: string;
  role: string;
}

export function useUpdateEmployee(
  employeeId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<UpdateEmployeeDto, any>({
    method: employeeId ? 'put' : 'post',
    url: employeeId ? `/${employeeId}` : '/invite',
    service: 'employees',
    options,
  });
}
