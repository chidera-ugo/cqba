import { EmployeeStatus } from 'hooks/api/employees/useGetAllEmployees';

export const employeesFilterOptions: {
  title: string;
  value: EmployeeStatus;
}[] = [
  { title: 'Active Employees', value: 'active' },
  { title: 'Pending Invites', value: 'invited' },
];
