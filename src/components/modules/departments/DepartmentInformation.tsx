import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useGetDepartmentById } from 'hooks/api/departments/useGetDepartmentById';
import { useQueryValidator } from 'hooks/common/useQueryValidator';

export const DepartmentInformation = () => {
  const { getValidQuery } = useQueryValidator();
  const id = getValidQuery('id');

  const { isLoading, isError } = useGetDepartmentById(id, {
    enabled: !!id,
  });

  if (isLoading) return <IsLoading />;

  if (isError)
    return <IsError description={'Failed to get account information'} />;

  return <></>;
};
