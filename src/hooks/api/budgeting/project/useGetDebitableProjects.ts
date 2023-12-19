import { UseQueryOptions } from '@tanstack/react-query';
import { IProject } from 'hooks/api/budgeting/project/useGetProjectById';
import { useTQuery } from 'hooks/api/useTQuery';
import { useTMutation } from 'hooks/api/useTMutation';
import { UseMutationOptions } from '@tanstack/react-query';

export function useGetDebitableProjects(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<IProject[]>({
    queryKey: ['debitable_projects'],
    url: `/project/beneficiary`,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
    },
  });
}

export function useGetDebitableProjectsByMutation(
  options?: UseMutationOptions<IProject[], unknown, void, unknown>
) {
  return useTMutation({
    method: 'get',
    url: `/project/beneficiary`,
    service: 'budgets',
    options,
  });
}
