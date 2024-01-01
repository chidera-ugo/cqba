import { UserRole } from 'enums/employee_enum';
import { SubscriptionStatus } from 'hooks/api/subscriptions/useGetSubscriptionHistory';

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
  _id: string;
  subscription: {
    months: number;
    gracePeriod: number;
    object?: Subscription;
  };
}

interface Subscription {
  _id: string;
  organization: string;
  plan: string;
  status: SubscriptionStatus;
  trial: boolean;
  endingAt: string;
  startedAt: string;
  renewAt: string;
  meta: Meta;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Meta {
  paymentMethod: string;
  months: number;
}
