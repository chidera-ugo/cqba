import { UseQueryOptions } from '@tanstack/react-query';
import { IDepartment } from 'hooks/api/departments/useGetAllDepartments';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetDepartmentById(
  departmentId: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<IDepartment>({
    queryKey: ['department', departmentId],
    url: `/${departmentId}`,
    service: 'departments',
    options,
  });
}
