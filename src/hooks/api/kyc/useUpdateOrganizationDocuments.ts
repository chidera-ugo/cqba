import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useUpdateOrganizationDocuments(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/update-business-documentation`,
    service: 'organizations',
    options,
  });
}
