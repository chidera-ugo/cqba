import { EmployeeRole } from 'enums/employee_enum';

export interface IUser {
  KYBStatus?: string;
  lastName?: string;
  emailVerifyCode?: string;
  status?: string;
  email?: string;
  firstName?: string;
  sKey?: string;
  emailVerified?: boolean;
  GSI1pKey?: string;
  roles?: string[];
  role?: EmployeeRole;
  organization?: string;
  updatedAt?: number;
  GSI1sKey?: string;
  hashRt?: string;
  id?: string;
  phone?: string;
  pinSet?: boolean;
  defaultCategoryIds?: string[];
}
