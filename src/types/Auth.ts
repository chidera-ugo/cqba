import { UserRole } from 'enums/employee_enum';

export interface IUser {
  KYBStatus?: string;
  lastName?: string;
  emailVerifyCode?: string;
  status?: string;
  email?: string;
  avatar?: string;
  firstName?: string;
  sKey?: string;
  emailVerified?: boolean;
  GSI1pKey?: string;
  roles?: string[];
  role?: UserRole;
  organization?: Organization;
  updatedAt?: number;
  GSI1sKey?: string;
  hashRt?: string;
  _id: string;
  phone?: string;
  pinSet?: boolean;
  defaultCategoryIds?: string[];
}

interface Organization {
  _id: '6571d4f0f769a3c8587d22e7';
  subscription: {
    months: number;
    gracePeriod: number;
    object?: string;
  };
}
