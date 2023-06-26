import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useGetSubAccountById } from 'hooks/api/sub-accounts/useGetSubAccountById';
import { useQueryValidator } from 'hooks/common/useQueryValidator';

export const SubAccountInformation = () => {
  const { getValidQuery } = useQueryValidator();
  const id = getValidQuery('id');

  const { isLoading, isError } = useGetSubAccountById(id, {
    enabled: !!id,
  });

  if (isLoading) return <IsLoading />;
  if (isError)
    return <IsError description={'Failed to get account information'} />;

  return <></>;
};
