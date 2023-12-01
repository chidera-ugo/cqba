export enum EmployeeRoles {
  cfo = 'CFO',
  employee = 'Employee',
  owner = 'Owner',
}

export type EmployeeRole = keyof typeof EmployeeRoles;
