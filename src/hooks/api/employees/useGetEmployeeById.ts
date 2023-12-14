import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetEmployeeById(id?: string) {
  return useTQuery<IEmployee>({
    queryKey: ['employee', String(id)],
    url: `/${id}`,
    service: 'employees',
    options: {
      enabled: !!id,
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
