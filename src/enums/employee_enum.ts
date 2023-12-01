export enum UserRoles {
  cfo = 'CFO',
  employee = 'Employee',
  owner = 'Owner',
}

export type UserRole = keyof typeof UserRoles;
