import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface ISubAccount {
  employeeId: string;
  departmentId: string;
  departmentTitle: string;
  status: string;
  createdAt: number;
  sKey: string;
  balance: number;
  accountHolderId: string;
  organizationId: string;
  accountHolderEmail: string;
  userId: string;
  updatedAt: number;
  accountHolderName: string;
  id: string;
}

export function useGetAllSubAccounts(
  params: {
    page: number;
    size: number;
    search?: string;
    status?: string;
  },
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _params = generateUrlParamsFromObject({
    data: params,
  });

  return useTQuery<PaginatedResponse<ISubAccount>>({
    queryKey: ['sub-accounts', _params],
    url: _params,
    service: 'sub-accounts',
    options: {
      ...options,
      staleTime: Infinity,
    },
  });
}
