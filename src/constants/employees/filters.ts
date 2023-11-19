import { EmployeeStatus } from 'hooks/api/employees/useGetAllEmployees';
import { z } from 'zod';

export const employeesFiltersSchema = z.object({
  status: z
    .object({
      title: z.string(),
      value: z.string().nullable(),
    })
    .catch({
      title: 'Active',
      value: 'active',
    }),
  employeeId: z.string().catch(''),
});

export const employeesFilterOptions: {
  title: string;
  value: EmployeeStatus;
}[] = [
  { title: 'Active Employees', value: 'active' },
  { title: 'Pending Invites', value: 'invited' },
];
