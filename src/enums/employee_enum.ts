export enum UserRoles {
  employee = 'Employee',
  owner = 'Owner',
}

export type UserRole = keyof typeof UserRoles;
