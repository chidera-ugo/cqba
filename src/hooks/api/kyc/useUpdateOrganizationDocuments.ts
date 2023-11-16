import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';
import { useTMutation } from 'hooks/api/useTMutation';

export function useUpdateOrganizationDocuments(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  const { user } = useAppContext().state;

  return useTMutation({
    url: `/${user?.organizationId}/update-business-documentation`,
    service: 'organizations',
    options,
  });
}
